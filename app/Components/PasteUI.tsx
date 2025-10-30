import React from "react";
import { Plus } from "lucide-react";
import PasteComponent from "./PasteComponent"

// interface paste{
//   paste_id: string,
//   paste_title: string,
//   paste_content: string
// }

// interface PasteUIProps{
//   pastes: paste[],
// }


const PasteUI = () => {
  return (
    <div className="bg-card rounded-2xl w-100 m-3 p-5 min-h-full h-[97vh]">
      {/* icon */}
      <div className="text-2xl font-bold mx-3">
        <span>QuickPasty</span>
      </div>

      {/* New paste button */}
      <div className="text-lg font-extrabold my-8 bg-primary w-full hover:bg-[#5345ee] rounded-lg">
        <button className="group flex mx-auto items-center gap-3 p-4 w-full justify-center cursor-pointer transition-all hover:scale-110">
          <Plus size={20} className="transition-all duration-100 ease-in group-hover:rotate-45 group-hover:scale-115"/>
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
