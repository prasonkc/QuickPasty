import React from "react";
import { Trash2 } from "lucide-react";

interface PasteComponentProps{
  title: string,
  desc: string
}

const PasteComponent: React.FC<PasteComponentProps>  =  ({title, desc}) => {
  return (
    <div className="border border-gray-700 rounded-lg h-20 p-2 cursor-pointer mb-3 hover:bg-card-2 transition-all hover:scale-105">
      {/* title */}
      <div className="font-bold text-lg flex items-center justify-between pr-2">
        <span>{title}</span>
        <Trash2
          size={18}
          className="transition-all hover:scale-115 duration-100"
        />
      </div>
      {/* desc */}
      <div className="text-sm">{desc}</div>
    </div>
  );
};

export default PasteComponent;
