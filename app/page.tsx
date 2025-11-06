"use client";
import { useEffect, useState } from "react";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paste } from "./types";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [pastes, setPastes] = useState<Paste[]>([])
  const [activePasteID, setActivePasteID] = useState<string>("")

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  return (
    <div className="flex">
      <PasteUi pastes={pastes} setPastes = {setPastes} setActivePasteID={setActivePasteID}/>
      <PasteContent
        pastes = {pastes}
        setPastes = {setPastes}
        activePasteID = {activePasteID}
      />
    </div>
  );
}
