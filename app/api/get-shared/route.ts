import Paste from "@/models/pastes";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const paste_id = searchParams.get("id");

    if (!paste_id) {
      return NextResponse.json({ error: "Paste Not Found" }, { status: 400 });
    }
    const paste = await Paste.findOne({ paste_id: paste_id });

    if(paste){
        return NextResponse.json({title: paste?.paste_title, content: paste?.paste_content}, {status:201})
    } else{
        return NextResponse.json({title: "Paste Not Found", content: ""}, {status:201})
    }
    
  } catch(e) {
    NextResponse.json({error: e}, {status: 500})
  }
}
