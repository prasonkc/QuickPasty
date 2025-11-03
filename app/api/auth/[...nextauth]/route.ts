import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/quickpasty";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}


const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "email-password",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("Invalid Username or Password");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid || !user) throw new Error("Invalid Username or Password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username
        };
      },
    }),
    CredentialsProvider({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize(credentials) {
        const { v4: uuidv4 } = require('uuid');
        return {
          id: `guest_${uuidv4()}`,
          name: "Guest User",
          email: null
        };
      }
    })
  ],
  callbacks: {
    // Save id to token when signing in
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    // Copy id from token to session
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
