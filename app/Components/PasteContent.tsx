import React from "react";
import { Edit, Copy, Share } from "lucide-react";
import { signOut } from "next-auth/react";

const PasteContent = () => {
  return (
    <div className="w-full bg-card ml-0 m-3 rounded-2xl p-3">
      {/* Title */}
      <div className="flex items-center justify-around">
        <input
          type="text"
          disabled
          placeholder="Your title here..."
          className="font-bold text-2xl flex items-center mx-3 my-2 outline-none w-full"
        />

        <div className="flex gap-7 items-center mr-5">
          <Edit className="cursor-pointer transition-all hover:scale-110" />
          <Copy className="cursor-pointer transition-all hover:scale-110" />
          <Share className="cursor-pointer transition-all hover:scale-110" />
        </div>
      </div>

      {/* Border */}
      <div className="my-3 h-0.5 w-full bg-border mx-auto"></div>

      {/* Description */}
      <div className="mx-3 relative">
        <textarea
          placeholder="Your text here..."
          disabled
          className="w-full resize-none text-white p-2 outline-none"
          rows={30}
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
