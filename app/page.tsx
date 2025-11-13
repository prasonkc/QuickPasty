"use client";
import { useEffect, useState } from "react";
import PasteContent from "./Components/PasteContent";
import PasteUi from "./Components/PasteSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paste } from "./types";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { increment, decrement } from "./redux/slices/counterSlice";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [pastes, setPastes] = useState<Paste[]>([]);
  const [activePasteID, setActivePasteID] = useState<string>("");

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  useEffect(() => {
    const fetchPastes = async () => {
      if (!session) return;

      await fetch(`/api/get-pastes?userID=${session?.user.id}`)
        .then((req) => req.json())
        .then((data) => {
          setPastes(data);
        });
    };
    fetchPastes();
  }, [session]);

  return (
    <div className="flex min-h-screen">
      <PasteUi
        pastes={pastes}
        setPastes={setPastes}
        activePasteID={activePasteID}
        setActivePasteID={setActivePasteID}
      />
      <PasteContent
        pastes={pastes}
        setPastes={setPastes}
        activePasteID={activePasteID}
      />

      <div>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>−</button>
      </div>
    </div>
  );
}
