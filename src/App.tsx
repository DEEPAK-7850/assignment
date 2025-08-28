// src/App.tsx

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <div className="flex h-[1280px] bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Navbar />
      
        <div className="flex-1 p-6">
          <TaskBoard/>
        </div>
      </main>
    </div>
  );
}

export default App;