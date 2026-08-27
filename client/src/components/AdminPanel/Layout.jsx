import Sidebar  from "./SideBar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  
  return (
    <div className="py-2! h-screen">
      <div className="h-full w-full border-2 border-black rounded-2xl overflow-hidden flex">
        <Sidebar />
        <div className="flex-1 min-h-0 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}