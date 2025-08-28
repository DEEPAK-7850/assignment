
import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Filter, Calendar, Share2, Edit2, Link, LayoutGrid, List, Trash2, Pencil } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { moveTask, deleteTask, changeTaskPriority, Task } from "../redux/tasksSlice";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onPriorityChange, onDelete, onEdit }: { task: Task, onPriorityChange: () => void, onDelete: () => void, onEdit: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine due date styling
  let dueDateStyle = "text-gray-500";
  let dueDateText = task.dueDate ? `Due: ${task.dueDate}` : "No due date";
  if (task.dueDate) {
    const now = new Date();
    const due = new Date(task.dueDate);
    const timeDiff = due.getTime() - now.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (timeDiff < -oneDayInMs) {
      dueDateStyle = "text-red-500 font-medium"; // Overdue
      dueDateText = `Overdue: ${task.dueDate}`;
    } else if (timeDiff <= oneDayInMs) {
      dueDateStyle = "text-yellow-600 font-medium"; // Due soon
      dueDateText = `Due soon: ${task.dueDate}`;
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl border space-y-3 relative">
      <div className="flex justify-between items-start">
        <button onClick={onPriorityChange} className={`text-xs font-semibold px-2 py-1 rounded-md ${task.priorityColor}`}>{task.priority}</button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)} className="text-gray-400 p-1 rounded-full hover:bg-gray-100"><MoreHorizontal size={20} /></button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-10 right-4 bg-white border rounded-md shadow-lg z-10 w-32">
          <ul>
            <li onMouseDown={onEdit} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><Pencil size={14} /> Edit</li>
            <li onMouseDown={onDelete} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"><Trash2 size={14} /> Delete</li>
          </ul>
        </div>
      )}
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.members.map((member, index) => <img key={index} src={member} alt="member" className="w-7 h-7 rounded-full border-2 border-white" />)}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className={dueDateStyle}>{dueDateText}</span>
          <span>💬 {task.comments} comments</span>
          <span>📎 {task.files} files</span>
        </div>
      </div>
    </div>
  );
};

const TaskColumn = ({ title, tasks, columnId, borderColorClass, dotColorClass, onAddTask, onEditTask }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteTask = (taskId: string) => { if (window.confirm("Are you sure?")) dispatch(deleteTask({ columnId, taskId })); };
  const handleChangePriority = (taskId: string) => dispatch(changeTaskPriority({ columnId, taskId }));
  return (
    <div className="w-full bg-gray-100 rounded-lg p-4 flex flex-col">
      <div className={`flex justify-between items-center border-b-4 ${borderColorClass} pb-4 mb-4`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColorClass}`}></div>
          <h2 className="font-bold text-lg">{title}</h2>
          <span className="bg-gray-200 text-gray-600 text-sm font-semibold rounded-full px-2 py-0.5">{tasks.length}</span>
        </div>
        {onAddTask && <button onClick={onAddTask} className="p-1 text-gray-500 hover:bg-gray-200 rounded-md"><Plus size={20} /></button>}
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="flex-1 space-y-4">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard task={task} onDelete={() => handleDeleteTask(task.id)} onEdit={() => onEditTask(task)} onChangePriority={() => handleChangePriority(task.id)}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const DashboardHeader = () => (
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Mobile App</h1>
            <button className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500"><Edit2 size={18} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500"><Link size={18} /></button>
        </div>
        <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-indigo-600 font-medium"><Plus size={18} /> Invite</button>
            <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=20" alt="member" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=21" alt="member" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=22" alt="member" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="https://i.pravatar.cc/32?img=23" alt="member" className="w-8 h-8 rounded-full border-2 border-white"/>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-red-100 text-red-500 flex items-center justify-center text-xs font-medium">+2</span>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium"><Share2 size={18} /> Share</button>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
                 <button className="p-2 bg-indigo-600 text-white rounded-md"><LayoutGrid size={20} /></button>
                 <button className="p-2 text-gray-400"><List size={20} /></button>
            </div>
        </div>
    </div>
);

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectFilter = (filter) => {
    setActiveFilter(filter);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3 relative">
        <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-gray-100">
          <Filter size={16} /> Filter
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 bg-white border rounded-md shadow-lg z-20 w-40">
            <ul>
              <li onMouseDown={() => handleSelectFilter('All')} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">All</li>
              <li onMouseDown={() => handleSelectFilter('Low')} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Low Priority</li>
              <li onMouseDown={() => handleSelectFilter('High')} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">High Priority</li>
              <li onMouseDown={() => handleSelectFilter('Completed')} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Completed</li>
            </ul>
          </div>
        )}
        <span className="text-sm text-gray-500">Current filter: <span className="font-medium text-gray-800">{activeFilter}</span></span>
      </div>
      <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-gray-100">
        <Calendar size={16} /> Today
      </button>
    </div>
  );
};

export default function TaskBoard() {
  const { todo, inProgress, done } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingTaskColumn, setEditingTaskColumn] = useState<'todo' | 'inProgress' | 'done'>('todo');
  const [activeFilter, setActiveFilter] = useState('All');
  const [reminderTasks, setReminderTasks] = useState<Task[]>([]);

  // Check for overdue or soon-due tasks
  useEffect(() => {
    const allTasks = [...todo, ...inProgress, ...done];
    const now = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const reminders = allTasks.filter(task => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      const timeDiff = due.getTime() - now.getTime();
      return timeDiff <= oneDayInMs && timeDiff >= -oneDayInMs; // Due within 24 hours or overdue
    });
    setReminderTasks(reminders);
  }, [todo, inProgress, done]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch(moveTask({
      sourceId: source.droppableId as any,
      destinationId: destination.droppableId as any,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    }));
  };

  const handleOpenEditModal = (task: Task, columnId: 'todo' | 'inProgress' | 'done') => {
    setEditingTask(task);
    setEditingTaskColumn(columnId);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const filterTasks = (tasks: Task[]) => {
    if (activeFilter === 'All') return tasks;
    return tasks.filter(task => task.priority === activeFilter);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <DashboardHeader />
          {reminderTasks.length > 0 && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4">
              <strong>Reminder:</strong> {reminderTasks.length} task(s) due soon or overdue: {reminderTasks.map(t => t.title).join(', ')}
            </div>
          )}
          <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn 
              title="To Do" 
              tasks={filterTasks(todo)}
              columnId="todo" 
              borderColorClass="border-blue-500" 
              dotColorClass="bg-blue-500" 
              onAddTask={() => setAddModalOpen(true)}
              onEditTask={(task) => handleOpenEditModal(task, 'todo')}
            />
            <TaskColumn 
              title="On Progress" 
              tasks={filterTasks(inProgress)}
              columnId="inProgress" 
              borderColorClass="border-yellow-500" 
              dotColorClass="bg-yellow-500" 
              onEditTask={(task) => handleOpenEditModal(task, 'inProgress')}
            />
            <TaskColumn 
              title="Done" 
              tasks={filterTasks(done)}
              columnId="done" 
              borderColorClass="border-green-500" 
              dotColorClass="bg-green-500" 
              onEditTask={(task) => handleOpenEditModal(task, 'done')}
            />
          </div>
        </div>
      </DragDropContext>
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      {editingTask && (
        <EditTaskModal 
          isOpen={!!editingTask} 
          onClose={handleCloseEditModal} 
          task={editingTask}
          columnId={editingTaskColumn}
        />
      )}
    </>
  );
}