// src/components/Navbar.tsx

import { Bell, Settings, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white flex items-center justify-between px-6 py-4 border-b-3 border-gray-300">
      {/* Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg bg-gray-200 h-[40px] w-[120px] rounded-lg">
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
            <p className="font-medium text-gray-800">Deepak Lakhara</p>
            <p className="text-sm text-gray-500">Rajasthan, India</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
}