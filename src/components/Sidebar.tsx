import {
    LayoutDashboard,
    MessageSquare,
    CheckSquare,
    Users,
    Settings,
    Plus,
    Lamp,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
  } from "lucide-react";
  import { useState, createContext, useContext } from "react";
  
  const SidebarContext = createContext();
  
  export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
  
    return (
      <aside className={`h-[1280px] bg-white border-r-3 border-gray-300 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`}>
        <SidebarContext.Provider value={{ expanded }}>
          <div>
            {/* Logo */}
            <div className="flex items-center justify-between pb-1 mb-4 border-3 rounded-lg border-gray-300">
              <div className={`flex items-center gap-2 overflow-hidden transition-all ${expanded ? "w-40" : "w-0"}`}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg shrink-0"></div>
                <h1 className="text-xl font-bold">Project M.</h1>
              </div>
              <button 
                onClick={() => setExpanded((curr) => !curr)} 
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
  
            {/* Main Navigation */}
            <ul className="flex-1 border-3 border-gray-300 rounded-lg space-y-1">
              <SidebarItem icon={<LayoutDashboard size={20} />} text="Home" />
              <SidebarItem icon={<MessageSquare size={20} />} text="Messages" />
              <SidebarItem icon={<CheckSquare size={20} />} text="Tasks" active />
              <SidebarItem icon={<Users size={20} />} text="Members" />
              <SidebarItem icon={<Settings size={20} />} text="Settings" />
            </ul>
  
            <hr className="my-6 border-gray-300" />
  
            {/* Projects Navigation */}
            <div className="space-y-2 rounded-lg p-2 border-3 border-gray-300">
              <div className={`flex items-center justify-between px-2 overflow-hidden transition-all ${expanded ? 'w-full' : 'w-0 h-0'}`}>
                <h2 className="text-sm font-bold text-gray-400 uppercase">My Projects</h2>
                <button className="p-1 hover:bg-gray-100 rounded"><Plus size={16} /></button>
              </div>
              <ul className="flex-1 space-y-1">
                <SidebarItem icon={<div className="w-2 h-2 rounded-full bg-green-500"></div>} text="Mobile App" />
                <SidebarItem icon={<div className="w-2 h-2 rounded-full bg-orange-500"></div>} text="Website Redesign" />
                <SidebarItem icon={<div className="w-2 h-2 rounded-full bg-blue-500"></div>} text="Design System" />
                <SidebarItem icon={<div className="w-2 h-2 rounded-full bg-purple-500"></div>} text="Wireframes" />
              </ul>
            </div>
          </div>
  
          {/* Bottom "Thoughts" Block */}
          <div className={`bg-gray-50 p-4 rounded-xl text-center relative overflow-hidden transition-all ${expanded ? '' : 'h-0 mt-6 p-0'}`}>
            <div className={`w-12 h-12 bg-gray-200 rounded-full mx-auto flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 transition-all ${!expanded && 'opacity-0'}`}>
              <Lamp className="text-yellow-500" />
            </div>
            <div className={`pt-8 transition-all ${!expanded && 'opacity-0'}`}>
              <h3 className="font-bold">Thoughts Time</h3>
              <p className="text-sm text-gray-500 my-2">Share thoughts with your peers.</p>
              <button className="w-full bg-white p-2 rounded-md font-medium mt-2 border">Write a message</button>
            </div>
          </div>
        </SidebarContext.Provider>
      </aside>
    );
  }
  
  export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
  
    return (
      <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${!expanded && "top-2"}`}></div>}
        {!expanded && (
          <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
        )}
      </li>
    );
  }