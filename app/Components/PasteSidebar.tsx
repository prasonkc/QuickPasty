import React from "react";
import { Plus } from "lucide-react";
import PasteComponent from "./PasteComponent";
import { Paste } from "../types";
import { v4 as uuidv4 } from "uuid";

interface PasteSidebarprops {
  pastes: Paste[];
  setPastes: React.Dispatch<React.SetStateAction<Paste[]>>;
}

const PasteSidebar: React.FC<PasteSidebarprops> = ({ pastes, setPastes }) => {
  function addPaste(title: string, content: string) {
    const newPaste: Paste = {
      id: uuidv4(),
      title: title,
      content: content,
    };
    setPastes([...pastes, newPaste]);
  }

  function handleDelete(id: string) {
    setPastes(pastes.filter((paste) => paste.id !== id))
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
          />
        ))}
      </div>
    </div>
  );
};

export default PasteSidebar;
