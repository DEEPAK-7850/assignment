import { Bell, Settings, Search, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../redux/authSlice";
import type { RootState, AppDispatch } from "../redux/store";

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="w-full bg-white flex items-center justify-between px-6 py-4 border-b-2 border-gray-200">
      {/* Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg bg-gray-100 h-10 px-3 rounded-lg">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-600 cursor-pointer hover:text-indigo-600" />
        <Settings className="text-gray-600 cursor-pointer hover:text-indigo-600" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-gray-800">{user?.email || "User"}</p>
            <p className="text-sm text-gray-500">Rajasthan, India</p>
          </div>
          <img
            src={`https://i.pravatar.cc/40?u=${user?.email}`}
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} title="Logout" className="p-2 hover:bg-gray-100 rounded-md">
          <LogOut className="text-gray-600" size={20} />
        </button>
      </div>
    </header>
  );
}

