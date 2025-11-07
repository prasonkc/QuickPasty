import Paste from "@/models/pastes";
// import User from "@/models/quickpasty";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  const { paste_id, paste_title, paste_content, userID } = await req.json();

  await connectToDB();
  const existingPaste = await Paste.findOne({ paste_id: paste_id });

  try {
    if (existingPaste) {
      console.log(paste_title, paste_content)
      await Paste.findByIdAndUpdate(existingPaste._id, {
        paste_title: paste_title,
        paste_content: paste_content,
        userID: userID,
      });
      return NextResponse.json(
        { message: "Paste successfully updated" },
        { status: 201 }
      );
    }
    const newPaste = new Paste({
      paste_id: paste_id,
      paste_title: paste_title,
      paste_content: paste_content,
      userID: userID,
    });
    await newPaste.save();
    return NextResponse.json(
      { message: "Paste successfully Created" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
