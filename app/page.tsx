"use client";
import { useEffect, useState } from "react";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paste } from "./types";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const pastes: Paste[] = [
    {
      id: 1,
      title: "New Paste",
      content: "Hello this is new paste",
    },
    {
      id: 2,
      title: "Newwww Paste 2",
      content: "Hewwo this is newwww pawwsteee",
    },
  ];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  return (
    <div className="flex">
      <PasteUi pastes={pastes} />
      <PasteContent
        title={title}
        desc={desc}
        setTitle={setTitle}
        setDesc={setDesc}
      />
    </div>
  );
}
