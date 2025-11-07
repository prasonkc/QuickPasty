import Paste from "@/models/pastes";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    const {paste_id, paste_title, paste_content, user} = await req.json()

    await connectToDB()
    const existingPaste = await Paste.findOne({paste_id})
    
    try{
        if(existingPaste){
            Paste.findByIdAndUpdate(existingPaste._id, {paste_title: paste_title, paste_content: paste_content, user:user})
            NextResponse.json({message: "Paste successfully updated"}, {status: 201})
        } else{
            const newPaste = new Paste({paste_id: paste_id, paste_title: paste_title, paste_content: paste_content, user:user})
            await newPaste.save()
            NextResponse.json({message: "Paste successfully Created"}, {status: 201})
        }
    } catch (e) {
        NextResponse.json({error: e}, {status: 500})
    }
}