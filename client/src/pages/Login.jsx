import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Users,
} from "lucide-react";

import { useLoginMutation } from "../store/adminApi.js";
import { setCredentials } from "../store/authSlice.js";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmitHandler = async (formData) => {
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap(); // .unwrap() se success/failure normal try-catch se pakad sakte ho
      dispatch(setCredentials(result.data));
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center py-4!">
      <div className="w-full max-w-6xl border-2 border-black rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
          <div>
            <h1 className="text-2xl font-extrabold text-black">Sportz</h1>
            <p className="text-sm text-black/70">Admin Panel</p>
          </div>
          <button onClick={() => navigate("/")}>
            <div className="flex items-center gap-2 bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live Matches
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-yellow-50 p-6! border-r-0 md:border-r-2 border-black">
            <h2 className="text-2xl font-extrabold text-black mb-2!">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-gray-600 mb-4!">
              Sign in to manage matches and share real-time updates.
            </p>

            <div className="flex items-center justify-center mb-4!">
              <img
                src="https://res.cloudinary.com/datjhn3ph/image/upload/v1787560188/herosection_qpvtcs.png"
                alt="Sportz live match illustration"
                className="w-70 h-auto"
              />
            </div>

            <hr className="border-gray-200 mb-4!" />

            <div className="space-y-3!">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 border border-yellow-300 rounded-lg">
                  <BarChart3 size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-black">Manage Matches</p>
                  <p className="text-sm text-gray-500">
                    Create, update and manage all matches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 border border-yellow-300 rounded-lg">
                  <MessageSquare size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-black">Live Commentary</p>
                  <p className="text-sm text-gray-500">
                    Add live commentary and keep fans updated.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 border border-yellow-300 rounded-lg">
                  <Users size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-black">Real-time Updates</p>
                  <p className="text-sm text-gray-500">
                    Changes reflect instantly for all users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6!">
            <div className="flex items-center gap-4 mb-4!">
              <div className="w-14 h-14 flex items-center justify-center bg-yellow-100 border-2 border-yellow-300 rounded-xl">
                <Lock size={24} className="text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">Admin Login</h2>
                <p className="text-sm text-gray-500">
                  Enter your credentials to continue
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-3"
            >
              <div className="mb-3!">
                <label className="block text-sm font-semibold text-black mb-2!">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="admin@sportz.com"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg pl-10! pr-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-colors duration-200"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPattern: (value) =>
                          /^\S+@\S+\.\S+$/.test(value) ||
                          "Email address must be valid",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="mb-5!">
                <label className="block text-sm font-semibold text-black mb-2!">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg pl-10! pr-10! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-colors duration-200"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="px-4! py-3! bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-red-600 text-md text-center">
                    {error?.data?.error || "Login failed"}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="my-4! w-full py-2.5! bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg border-2 border-black transition-colors duration-200"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="flex items-center gap-3 py-1!">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3!">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-yellow-400 border border-black rounded-full">
                  <ShieldCheck size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">
                    Secure Admin Access
                  </p>
                  <p className="text-sm text-gray-500">
                    Only authorized admin can access the panel and manage data.
                  </p>
                </div>
              </div>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4!">
              © 2026 Sportz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
