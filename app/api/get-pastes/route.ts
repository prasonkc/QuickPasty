import Paste from "@/models/pastes";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json({ error: "Missing userID" }, { status: 400 });
    }
    const pastes = await Paste.find({ userID });

    return new Response(JSON.stringify(pastes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch(e) {
    NextResponse.json({error: e}, {status: 500})
  }
}
