import React, { useEffect, useRef, useState } from "react";
import { Edit, Copy, Share } from "lucide-react";
import { signOut } from "next-auth/react";

function handleShare() {}

interface PasteContentProps {
  title: string;
  desc: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

const PasteContent: React.FC<PasteContentProps> = ({
  title,
  desc,
  setTitle,
  setDesc,
}) => {
  const [editable, setEditable] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const title = document.getElementById("title");
    const desc = document.getElementById("desc")
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
    <div className="w-full bg-card ml-0 m-3 rounded-2xl p-3">
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
            setTitle(e.target.value);
          }}
          id="title"
        />

        <div className="flex gap-7 items-center mr-5">
          <Edit
            className="cursor-pointer transition-all hover:scale-110"
            onClick={() => {
              setEditable(!editable);
              console.log(editable)
            }}
          />
          <Copy
            className="cursor-pointer transition-all hover:scale-110"
            onClick={() => {
              const copy = "Title: " + title + "\n" + "Description: " + desc;
              navigator.clipboard.writeText(copy);
            }}
          />
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
          onChange={(e) => setDesc(e.target.value)}
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
