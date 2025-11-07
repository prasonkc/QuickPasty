import React from "react";
import { Plus } from "lucide-react";
import PasteComponent from "./PasteComponent";
import { Paste } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

interface PasteSidebarprops {
  pastes: Paste[];
  setPastes: React.Dispatch<React.SetStateAction<Paste[]>>;
  setActivePasteID: React.Dispatch<React.SetStateAction<string>>;
  activePasteID: string;
}

const PasteSidebar: React.FC<PasteSidebarprops> = ({
  pastes,
  setPastes,
  setActivePasteID,
  activePasteID,
}) => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  async function addPaste(title: string, content: string) {
    const newPaste: Paste = {
      id: uuidv4(),
      title: title,
      content: content,
    };

    setPastes([...pastes, newPaste]);

    await fetch("/api/save-paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paste_id: newPaste.id,
        paste_title: newPaste.title,
        paste_content: newPaste.content,
        userID: userID,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleDelete(id: string) {
    setPastes(pastes.filter((paste) => paste.id !== id));

    console.log(activePasteID);
    await fetch(`/api/delete-paste?id=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
    }

  return (
    <div className="bg-card rounded-2xl w-100 m-3 p-5 min-h-full hidden md:flex flex-col">
      {/* icon */}
      <div className="text-2xl font-bold mx-3">
        <span>QuickPasty</span>
      </div>

      {/* New paste button */}
      <div className="text-lg font-extrabold mt-8 bg-primary w-full hover:bg-[#5345ee] rounded-lg">
        <button
          className="group flex mx-auto items-center gap-3 p-4 w-full justify-center cursor-pointer transition-all hover:scale-110"
          onClick={() => {
            addPaste("Edit your title", "Edit your content");
          }}
        >
          <Plus
            size={20}
            className="transition-all duration-100 ease-in group-hover:rotate-45 group-hover:scale-115"
          />
          <span>New Paste</span>
        </button>
      </div>

      {/* border */}
      <div className="my-10 h-0.5 w-full bg-border mx-auto"></div>
      {/* pastes */}
      <div className="paste-container ">
        {pastes.map((paste) => (
          <PasteComponent
            key={paste.id}
            paste={paste}
            onDelete={handleDelete}
            activePasteID={activePasteID}
            setActivePasteID={setActivePasteID}
          />
        ))}
      </div>
    </div>
  );
};

export default PasteSidebar;
