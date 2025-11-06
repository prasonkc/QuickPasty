import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Edit, Copy, Share } from "lucide-react";
import { signOut } from "next-auth/react";
import StatusPopup from "./StatusPopup";
import { Paste } from "../types";

function handleShare() {}

interface PasteContentProps {
  activePasteID: string;
  pastes: Paste[];
  setPastes: React.Dispatch<SetStateAction<Paste[]>>;
}

const PasteContent: React.FC<PasteContentProps> = ({
  activePasteID,
  pastes,
  setPastes,
}) => {
  const [editable, setEditable] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const updatePaste = (id: string, updatedFields: Partial<Paste>) => {
    setPastes((prev) =>
      prev.map((paste) =>
        paste.id === id ? { ...paste, ...updatedFields } : paste
      )
    );
  };

    const activePaste = pastes.find((paste) => paste.id === activePasteID);

  useEffect(() => {
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    if (editable) {
      title?.removeAttribute("disabled");
      desc?.removeAttribute("disabled");
      inputTitleRef.current?.focus();
    } else {
      title?.setAttribute("disabled", "");
      desc?.setAttribute("disabled", "");
    }
  }, [editable]);

  return (
    <div className="w-full bg-card ml-0 m-3 rounded-2xl min-h-full p-3">
      {/* Title */}
      <div className="flex items-center justify-around">
        <input
          ref={inputTitleRef}
          type="text"
          disabled
          placeholder="Your title here..."
          className="font-bold text-2xl flex items-center mx-3 my-2 outline-none w-full"
          required
          onChange={(e) => {
            updatePaste(activePasteID, { title: e.target.value });
          }}
          value={activePaste?.title || ""}
          id="title"
        />

        <div className="flex gap-7 items-center mr-5">
          <Edit
            className="cursor-pointer transition-all hover:scale-110"
            onClick={() => {
              setEditable(!editable);
            }}
          />
          <Copy
            className="cursor-pointer transition-all hover:scale-110"
            onClick={() => {
              const copy =
                "Title: " +
                activePaste?.title +
                "\n" +
                "Description: " +
                activePaste?.title;
              navigator.clipboard.writeText(copy);
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          />

          {copied && <StatusPopup status="Copied!" stbool={true} />}
          {}
          <Share
            className="cursor-pointer transition-all hover:scale-110"
            onClick={handleShare}
          />
        </div>
      </div>

      {/* Border */}
      <div className="my-3 h-0.5 w-full bg-border mx-auto"></div>

      {/* Description */}
      <div className="mx-3 relative">
        <textarea
          id="desc"
          placeholder="Your text here..."
          disabled
          className="w-full resize-none text-white p-2 outline-none"
          rows={30}
          onChange={(e) => {updatePaste(activePasteID, { content: e.target.value })}}
          value={activePaste?.content || ""}
        />
        <button
          className="absolute bottom-2 right-2 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg hover:border-red-500 transition-colors cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PasteContent;
