import Sidebar from './components/Sidebar.tsx';
import TaskBoard from './components/TaskBoard.tsx';
import Navbar from './components/Navbar.tsx';

export default function DashboardLayout() {
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

