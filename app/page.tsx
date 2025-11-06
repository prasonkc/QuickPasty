"use client"
import { useEffect, useState } from "react";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteUI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession()
  const router = useRouter()

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")

  useEffect(() => {
      if(!session){
    router.push("/login")
  }
  }, [])
  

  return (
  <div className="flex">
      <PasteUi title={title} desc={desc}/>
      <PasteContent title={title} desc={desc} setTitle={setTitle} setDesc={setDesc}/>
  </div>
  );
}
