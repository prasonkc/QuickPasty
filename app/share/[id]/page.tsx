"use client"

import { usePathname } from "next/navigation";
import { Copy } from "lucide-react";
import { useState, useEffect } from "react";
import StatusPopup from "@/app/Components/StatusPopup";
import Link from "next/link";

const Share = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  
  const [copied, setCopied] = useState(false);

  const [title, setTitle] = useState("Title")
  const [content, setContent] = useState("Content")

  useEffect(() => {
    fetch(`/api/get-shared?id=${id}`)
    .then(res=>res.json())
    .then((data) => {
      setTitle(data.title)
      setContent(data.content)
    })
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
   <div className="bg-card w-[97vw] h-[97vh] mx-auto my-3 rounded-3xl shadow-lg p-6 flex flex-col">

      
      <div className="title text-3xl font-bold text-white mb-2 flex items-center justify-between">
        {title}
        <Copy 
          className="cursor-pointer text-gray-500 hover:text-gray-300 transition-colors" 
          size={24} 
          onClick={handleCopy} 
        />
      </div>

      <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
        <Link href={"/"}>
          <span className="font-semibold m-1">Shared with</span>
          <span className="text-white font-bold">QuickPastey</span>
        </Link>
      </div>

      <div className="content text-white text-lg flex-1 overflow-y-auto">
        <pre>
          {content}
        </pre>
      </div>

      {copied && (<StatusPopup status="Copied to Clipboard" stbool={true} />)}
    </div>  );
};

export default Share;
