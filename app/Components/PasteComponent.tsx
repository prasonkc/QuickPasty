import React from "react";
import { Trash2 } from "lucide-react";
import { Paste } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setActivePasteID } from "../redux/slices/activePasteIDSlice";
import { deletePaste } from "../redux/slices/pastesSlice";

interface PasteComponentProps {
  paste: Paste;
}

const PasteComponent: React.FC<PasteComponentProps> = ({ paste }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activePasteID = useSelector(
    (state: RootState) => state.activePasteID.value
  );

    async function handleDelete(id: string) {
    // setPastes(pastes.filter((paste) => paste.paste_id !== id));
    dispatch(deletePaste(id))

    await fetch(`/api/delete-paste?id=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
    }

  
  return (
    <div
      className={`border border-gray-700 rounded-lg h-20 px-4 py-3 cursor-pointer mb-3 hover:bg-card-2 transition-all hover:scale-105 ${
        paste.paste_id === activePasteID ? "bg-card-2 scale-105" : ""
      }`}
      onClick={() => {
        dispatch(setActivePasteID(paste.paste_id));
      }}
    >
      {/* title */}
      <div className="font-bold text-sm md:text-lg flex items-center justify-between pr-2">
        <span>{paste.paste_title.slice(0, 17)}</span>
        <Trash2
          size={18}
          className="transition-all hover:scale-115 duration-100"
          onClick={async (e) => {
            e.stopPropagation();
            handleDelete(paste.paste_id);
          }}
        />
      </div>
      {/* desc */}
      <div className="text-sm">{paste.paste_content.slice(0, 26)}</div>
    </div>
  );
};

export default PasteComponent;
