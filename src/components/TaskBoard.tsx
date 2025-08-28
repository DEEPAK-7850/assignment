// src/components/TaskBoard.tsx

import { Plus, MoreHorizontal, Filter, Calendar, Share2, Edit2, Link, LayoutGrid, List } from "lucide-react";

const tasks = {
  // ... tasks data remains the same
  todo: [
    {
      id: 1,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: "Low",
      priorityColor: "bg-orange-100 text-orange-500",
      comments: 12,
      files: 0,
      members: ["https://i.pravatar.cc/24?img=1", "https://i.pravatar.cc/24?img=2", "https://i.pravatar.cc/24?img=3"],
    },
    {
      id: 2,
      title: "Research",
      description: "User research helps you to create an optimal product for users.",
      priority: "High",
      priorityColor: "bg-red-100 text-red-500",
      comments: 10,
      files: 3,
      members: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"],
    },
     {
      id: 3,
      title: "Wireframes",
      description: "Low fidelity wireframes include the most basic content and visuals.",
      priority: "High",
      priorityColor: "bg-red-100 text-red-500",
      comments: 5,
      files: 1,
      members: ["https://i.pravatar.cc/24?img=6", "https://i.pravatar.cc/24?img=7"],
    },
  ],
  inProgress: [
    {
      id: 4,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: "Low",
      priorityColor: "bg-orange-100 text-orange-500",
      comments: 12,
      files: 0,
      members: ["https://i.pravatar.cc/24?img=8", "https://i.pravatar.cc/24?img=9", "https://i.pravatar.cc/24?img=10"],
    },
    {
      id: 5,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: "Low",
      priorityColor: "bg-orange-100 text-orange-500",
      comments: 12,
      files: 0,
      members: ["https://i.pravatar.cc/24?img=11", "https://i.pravatar.cc/24?img=12"],
    },
  ],
  done: [
     {
      id: 6,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: "Low",
      priorityColor: "bg-orange-100 text-orange-500",
      comments: 12,
      files: 0,
      members: ["https://i.pravatar.cc/24?img=13", "https://i.pravatar.cc/24?img=14", "https://i.pravatar.cc/24?img=15"],
    },
    {
      id: 7,
      title: "Design System",
      description: "It just needs to adapt the UI from what you did before.",
      priority: "Completed",
      priorityColor: "bg-green-100 text-green-500",
      comments: 12,
      files: 15,
      members: ["https://i.pravatar.cc/24?img=16", "https://i.pravatar.cc/24?img=17"],
    },
  ],
};

// Accept the full class names as props
const TaskColumn = ({ title, tasks, borderColorClass, dotColorClass }) => (
  <div className="w-full bg-gray-200 rounded-lg p-4">
    {/* Use the full class name prop directly */}
    <div className={`flex justify-between items-center border-b-4 ${borderColorClass} mb-4`}>
      <div className="flex items-center gap-2">
        {/* Use the full class name prop for the dot */}
        <div className={`w-2 h-2 rounded-full ${dotColorClass}`}></div>
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="bg-gray-300 text-gray-600 text-sm font-semibold rounded-full px-2 py-0.5">{tasks.length}</span>
      </div>
      <button className="p-1 text-gray-500 hover:bg-gray-200 rounded-md">
        <Plus size={20} />
      </button>
      {/* The hr tag still uses the dot color class */}
      <hr className={`my-6 ${dotColorClass}`} />
    </div>
    
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
);

const TaskCard = ({ task }) => (
  // ... TaskCard component remains the same
  <div className="bg-white p-4 rounded-xl border space-y-3">
    <div className="flex justify-between items-start">
      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${task.priorityColor}`}>
        {task.priority}
      </span>
      <button className="text-gray-400">
        <MoreHorizontal size={20} />
      </button>
    </div>
    <h3 className="font-bold text-lg">{task.title}</h3>
    <p className="text-sm text-gray-500">{task.description}</p>
    <div className="flex justify-between items-center">
      <div className="flex -space-x-2">
        {task.members.map((member, index) => (
          <img key={index} src={member} alt="member" className="w-7 h-7 rounded-full border-2 border-white" />
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>💬 {task.comments} comments</span>
        <span>📎 {task.files} files</span>
      </div>
    </div>
  </div>
);

const DashboardHeader = () => (
    // ... DashboardHeader component remains the same
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Mobile App</h1>
            <button className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500">
                <Edit2 size={18} />
            </button>
             <button className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500">
                <Link size={18} />
            </button>
        </div>
        <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-indigo-600 font-medium">
                <Plus size={18} /> Invite
            </button>
            <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=20" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=21" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=22" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=23" className="w-8 h-8 rounded-full border-2 border-white"/>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-red-100 text-red-500 flex items-center justify-center text-xs font-medium">+2</span>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium">
                <Share2 size={18} /> Share
            </button>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
                 <button className="p-2 bg-indigo-600 text-white rounded-md">
                    <LayoutGrid size={20} />
                </button>
                 <button className="p-2 text-gray-400">
                    <List size={20} />
                </button>
            </div>
        </div>
    </div>
)

const FilterBar = () => (
    // ... FilterBar component remains the same
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-gray-100">
                <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-gray-100">
                <Calendar size={16} /> Today
            </button>
        </div>
    </div>
)

export default function TaskBoard() {
  return (
    <div>
      <DashboardHeader />
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pass the complete, static class names as props */}
        <TaskColumn title="To Do" tasks={tasks.todo} borderColorClass="border-blue-500" dotColorClass="bg-blue-500" />
        <TaskColumn title="On Progress" tasks={tasks.inProgress} borderColorClass="border-yellow-500" dotColorClass="bg-yellow-500" />
        <TaskColumn title="Done" tasks={tasks.done} borderColorClass="border-green-500" dotColorClass="bg-green-500" />
      </div>
    </div>
  );
}