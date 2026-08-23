import { useState } from "react";

export default function Header() {
  const [isOnline, setIsOnline] = useState(false);
  return (
    <div className="w-full bg-amber-300 border-2 border-black rounded-2xl px-6! py-2! flex items-center justify-between">
      <div>
        <h1 className="text-xl font-extrabold text-black">Spotrz</h1>
        <p className="text-sm text-black/70">Real-time match data</p>
      </div>
      <div className="badge badge-outline border-2 border-black text-black gap-2 px-3! py-3! bg-amber-50 font-bold">
        <span
          className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}
        ></span>
        {isOnline ? "ONLINE" : "OFFLINE"}
      </div>
    </div>
  );
}
