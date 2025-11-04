"use client"
import { useEffect } from "react";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteUI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
      if(!session){
    router.push("/login")
  }
  }, [])
  
  // Github SSH key test333333333333333333333

  return (
  <div className="flex">
      <PasteUi />
      <PasteContent/>
  </div>
  );
}
