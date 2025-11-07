import { NextResponse, NextRequest } from "next/server";
import Paste from "@/models/pastes";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id');

  console.log(id);
  await connectToDB();
  try {
    const deleted = await Paste.findOneAndDelete({ paste_id: id });

    if (!deleted) {
      return NextResponse.json({ error: "Paste not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Paste successfully deleted" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
