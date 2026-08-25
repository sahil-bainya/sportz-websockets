import { LayoutGrid, PlusCircle, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/adminApi.js";
import { clearCredentials } from "../../store/authSlice";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, path: "/admin", end: true },
  {
    label: "Create Match",
    icon: PlusCircle,
    path: "/admin/create-match",
    end: false,
  },
];

export default function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(clearCredentials());
      navigate("/");
    }
  };

  return (
    <div className="w-64 flex flex-col border-r-2 border-black bg-white">
      <div className="bg-amber-300 px-6! py-5! border-b-2 border-black">
        <h1 className="text-xl font-extrabold text-black">Sportz</h1>
        <p className="text-sm text-black/70">Admin Panel</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4! space-y-1!">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4! py-3! rounded-xl text-sm font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-black hover:bg-gray-50"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}

        <div className="pt-2!">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4! py-3! rounded-xl text-sm font-semibold text-black hover:bg-gray-50 transition-colors duration-150"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="p-4! border-t border-gray-100">
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3! py-2.5!">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full">
            <User size={18} className="text-black" />
          </div>
          <div>
            <p className="text-sm font-bold text-black">
              {admin?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">{admin?.email}</p>
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
