import { UserShield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header({status}) {
  
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="w-full bg-amber-300 border-2 border-black rounded-2xl px-6! py-2! flex items-center justify-between mt-5!">
      <div>
        <h1 className="text-xl font-extrabold text-black">Spotrz</h1>
        <p className="text-sm text-black/70">Real-time match data</p>
      </div>
      <div className="flex gap-5">
        <div className="badge badge-outline border-2 border-black text-black gap-2 px-3! py-3! bg-amber-50 font-bold">
          <span
            className={`w-3 h-3 rounded-full ${status ? "bg-green-400" : "bg-gray-400"}`}
          ></span>
          {status ? "ONLINE" : "OFFLINE"}
        </div>
        {isAuthenticated ? (
          <button onClick={() => navigate("/admin")}>
            <div className="badge badge-outline border-2 border-black text-black gap-2 px-3! py-3! bg-amber-50 font-bold">
              <UserShield size={16} strokeWidth={3} />
              Admin Dashboard
            </div>
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>
            <div className="badge badge-outline border-2 border-black text-black gap-2 px-3! py-3! bg-amber-50 font-bold">
              <UserShield size={16} strokeWidth={3} />
              Admin Login
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
