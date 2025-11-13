import React, { useEffect, useRef, useState } from "react";
import { Edit, Copy, Share } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import StatusPopup from "./StatusPopup";
import { Paste } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updatePaste } from "../redux/slices/pastesSlice";

const PasteContent = () => {
  const [editable, setEditable] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const pastes = useSelector((state: RootState) => state.pastes.value);
  const activePasteID = useSelector((state:RootState) => state.activePasteID.value)
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdatePaste = (id: string, updatedFields: Partial<Paste>) => {
    dispatch(updatePaste({ id, updatedFields }));
  };

  const activePaste = pastes.find((paste) => paste.paste_id === activePasteID);

  const { data: session } = useSession();

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

  const handleEditAndFetch = async () => {
    setEditable(!editable);
    await updateInfo();
  };

  const updateInfo = async () => {
    await fetch("/api/save-paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paste_id: activePaste?.paste_id,
        paste_title: activePaste?.paste_title,
        paste_content: activePaste?.paste_content,
        userID: session?.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    updateInfo();
  });

  return (
    <div className="w-full bg-card m-3 md:ml-0 rounded-2xl p-3">
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
            handleUpdatePaste(activePasteID, { paste_title: e.target.value });
          }}
          value={activePaste?.paste_title || ""}
          id="title"
        />

        <div className="flex gap-7 items-center mr-5">
          <Edit
            className="cursor-pointer transition-all hover:scale-110"
            onClick={handleEditAndFetch}
          />
          <Copy
            className="cursor-pointer transition-all hover:scale-110 hidden md:flex"
            onClick={() => {
              const copy =
                "Title: " +
                activePaste?.paste_title +
                "\n" +
                "Description: " +
                activePaste?.paste_title;
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
            onClick={async () => {
              await updateInfo();

              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/share/${activePaste?.paste_id}`
              );
              setShareCopied(true);

              setTimeout(() => {
                setShareCopied(false);
              }, 3000);
            }}
          />
          {shareCopied && (
            <StatusPopup status="Link Copied to clipboard!" stbool={true} />
          )}
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
          rows={33}
          onChange={(e) => {
            handleUpdatePaste(activePasteID, { paste_content: e.target.value });
          }}
          value={activePaste?.paste_content || ""}
        />
        <button
          className="absolute bottom-2 right-2 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg hover:border-red-500 transition-colors cursor-pointer"
          onClick={async () => {
            if (session?.user?.id?.startsWith("guest_")) {
              try {
                await fetch("/api/cleanup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userID: session.user.id }),
                });
              } catch (err) {
                console.error("Failed to cleanup guest:", err);
              }
            }
            await signOut({ callbackUrl: "/login" });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PasteContent;
