import { connectToDB } from "@/lib/mongodb";
import Paste from "@/models/pastes";

export async function POST(req: Request) {
  const { userID } = await req.json();

  if (!userID?.startsWith("guest_")) {
    return new Response("Not a guest account", { status: 400 });
  }

  try {
    await connectToDB();
    await Paste.deleteMany({ userID });
    return new Response("Guest pastes deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting guest pastes:", error);
    return new Response("Error deleting guest data", { status: 500 });
  }
}
