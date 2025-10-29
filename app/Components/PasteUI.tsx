import React from "react";
import { Plus } from "lucide-react";
import PasteComponent from "./PasteComponent"

const PasteUI = () => {
  return (
    <div className="bg-card rounded-2xl w-100 m-3 p-5 min-h-full h-[97vh]">
      {/* icon */}
      <div className="text-2xl font-bold mx-3">
        <span>QuickPasty</span>
      </div>

      {/* New paste button */}
      <div className="text-lg font-extrabold my-8 bg-primary w-full hover:bg-[#5345ee] rounded-lg">
        <button className="flex mx-auto items-center gap-3 p-4 w-full justify-center cursor-pointer">
          <Plus size={20} />
          <span>New Paste</span>
        </button>
      </div>

      {/* border */}
      <div className="my-10 h-0.5 w-full bg-border mx-auto"></div>
      {/* pastes */}
      <div className="paste-container ">
        <PasteComponent />
        <PasteComponent />
        <PasteComponent />
      </div>
    </div>
  );
};

export default PasteUI;
