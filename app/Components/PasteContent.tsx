import React from "react";
import { Edit, Copy, Share } from "lucide-react";

const PasteContent = () => {
  return (
    <div className="w-full bg-card ml-0 m-3 rounded-2xl p-3">
      {/* Title */}
      <div className="flex justify-around">
        <input
          type="text"
          disabled
          placeholder="Your title here..."
          className="font-bold text-2xl flex items-center m-3 outline-none w-full"
        />

        <div className="flex gap-7 items-center mr-5">
          <Edit className="cursor-pointer transition-all hover:scale-110"/>
          <Copy className="cursor-pointer transition-all hover:scale-110"/>
          <Share className="cursor-pointer transition-all hover:scale-110"/>
        </div>
      </div>

      {/* Border */}
      <div className="my-6 h-0.5 w-full bg-border mx-auto"></div>

      {/* Description */}
      <div className="m-3">
        <textarea
          placeholder="Your text here..."
          disabled
          className="w-full resize-none text-white p-2 outline-none"
          rows={30}
        />
      </div>
    </div>
  );
};

export default PasteContent;
