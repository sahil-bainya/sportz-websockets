import { useState } from "react";
import {
  LayoutGrid,
  PlusCircle,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Create Match", icon: PlusCircle },
];

export default function Sidebar({ active = "Dashboard", onNavigate }) {
  const navigate = useNavigate()
  const email="admin@sportz.com"
  const [activeItem, setActiveItem] = useState(active);

  const handleClick = (label) => {
    setActiveItem(label);
    onNavigate?.(label);
    if(label==="Logout")navigate("/")
  };

  return (
    <div className=" w-64 flex flex-col border-r-2 border-black bg-white">
      {/* Header */}
      <div className="bg-amber-300 px-6! py-5! border-b-2 border-black">
        <h1 className="text-xl font-extrabold text-black">Sportz</h1>
        <p className="text-sm text-black/70">Admin Panel</p>
      </div>

      {/* Nav */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4! space-y-1!">
        {navItems.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className={`w-full flex items-center gap-3 px-4! py-3! rounded-xl text-sm font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-black hover:bg-gray-50"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}

        <div className="pt-2!">
          <button
            onClick={() => handleClick("Logout")}
            className="w-full flex items-center gap-3 px-4! py-3! rounded-xl text-sm font-semibold text-black hover:bg-gray-50 transition-colors duration-150"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Admin card */}
      <div className="p-4! border-t border-gray-100">
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3! py-2.5!">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full">
            <User size={18} className="text-black" />
          </div>
          <div>
            <p className="text-sm font-bold text-black">Admin</p>
            <p className="text-xs text-gray-500">{email}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5!">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}