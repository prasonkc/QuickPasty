import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/quickpasty"
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request, res: NextResponse) {
    try {
        const { username, email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        await connectToDB();
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists. Try logging in" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = new User({ username: username, email: email, password: hashedPassword })
        await newUser.save();
        return NextResponse.json({ message: "Registration successful" }, { status: 201 })
    } catch (e: any) {
        console.error("Registration error", e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}