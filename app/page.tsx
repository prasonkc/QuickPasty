"use client"
import Image from "next/image";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteUI";


export default function Home() {
  return (
  <div className="flex">
      <PasteUi />
      <PasteContent/>
  </div>
  );
}
