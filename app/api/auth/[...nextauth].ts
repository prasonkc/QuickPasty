import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/lumio";
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username
        };
      },
    }),
  ],
  callbacks: {
    // ⬇️ Save id to token when signing in
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    // ⬇️ Copy id from token to session
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
