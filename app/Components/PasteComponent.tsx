import React from "react";
import { Trash2 } from "lucide-react";
import { Paste } from "../types";

interface PasteComponentProps {
  paste: Paste;
  onDelete: (id: string) => void;
  activePasteID: string;
  setActivePasteID: React.Dispatch<React.SetStateAction<string>>;
}

const PasteComponent: React.FC<PasteComponentProps> = ({
  paste,
  onDelete,
  activePasteID,
  setActivePasteID,
}) => {
  return (
    <div
      className={`border border-gray-700 rounded-lg h-20 px-4 py-3 cursor-pointer mb-3 hover:bg-card-2 transition-all hover:scale-105 ${
        paste.paste_id === activePasteID ? "bg-card-2 scale-105" : ""
      }`}
      onClick={() => {
        setActivePasteID(paste.paste_id);
      }}
    >
      {/* title */}
      <div className="font-bold text-sm md:text-lg flex items-center justify-between pr-2">
        <span>{paste.paste_title.slice(0,17)}</span>
        <Trash2
          size={18}
          className="transition-all hover:scale-115 duration-100"
          onClick={async (e) => {
            e.stopPropagation();
            onDelete(paste.paste_id);
          }}
        />
      </div>
      {/* desc */}
      <div className="text-sm">{paste.paste_content.slice(0, 26)}</div>
    </div>
  );
};

export default PasteComponent;
