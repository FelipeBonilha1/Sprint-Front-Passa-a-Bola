import { useEffect, useState } from "react";
import { toast } from "../lib/toast";

export default function Toaster() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return toast.subscribe((t) => {
      setItems((s) => [...s, t]);
      if (t.duration !== 0) {
        setTimeout(() => {
          setItems((s) => s.filter((i) => i.id !== t.id));
        }, t.duration ?? 3000);
      }
    });
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-[70] pointer-events-none">
      <div className="mx-auto sm:mx-0 sm:absolute sm:right-6 sm:max-w-sm flex flex-col gap-2 px-4 sm:px-0">
        {items.map((i) => (
          <div
            key={i.id}
            className={`pointer-events-auto rounded-xl border backdrop-blur px-4 py-3 shadow
              ${i.type === "error" ? "border-red-500/30 bg-red-500/10" :
                i.type === "success" ? "border-emerald-500/30 bg-emerald-500/10" :
                "border-white/15 bg-black/60"}`}
          >
            <p className="text-sm">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
