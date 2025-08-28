
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'High' | 'Completed';
  priorityColor: string;
  comments: number;
  files: number;
  members: string[];
  dueDate: string | null; // Added for due date
}

interface TasksState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

// Function to save the current state to localStorage
const saveState = (state: TasksState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Function to load state from localStorage or return initial data
const loadState = (): TasksState => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      // If nothing is in localStorage, return the default initial data
      return {
        todo: [ { id: "1", title: "Brainstorming", description: "Brainstorming brings team members' diverse experience into play.", priority: "Low", priorityColor: "bg-orange-100 text-orange-500", comments: 12, files: 0, members: ["https://i.pravatar.cc/24?img=1"], dueDate: null } ],
        inProgress: [ { id: "4", title: "Onboarding Illustrations", description: "...", priority: "Low", priorityColor: "bg-orange-100 text-orange-500", comments: 14, files: 15, members: ["https://i.pravatar.cc/24?img=5"], dueDate: "2025-08-30" } ],
        done: [ { id: "7", title: "Design System", description: "It just needs to adapt the UI from what you did before.", priority: "Completed", priorityColor: "bg-green-100 text-green-500", comments: 12, files: 15, members: ["https://i.pravatar.cc/24?img=9"], dueDate: "2025-08-27" } ]
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // If there's an error, return an empty state
    return { todo: [], inProgress: [], done: [] };
  }
};

const initialState: TasksState = loadState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string; priority: 'Low' | 'High'; dueDate: string | null }>) => {
      const priorityColor = action.payload.priority === 'Low' ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500';
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        priorityColor: priorityColor,
        comments: 0,
        files: 0,
        members: [],
        dueDate: action.payload.dueDate,
      };
      state.todo.push(newTask);
      saveState(state);
    },
    moveTask: (state, action: PayloadAction<{ sourceId: keyof TasksState, destinationId: keyof TasksState, sourceIndex: number, destinationIndex: number }>) => {
      const { sourceId, destinationId, sourceIndex, destinationIndex } = action.payload;
      const sourceColumn = state[sourceId];
      const destColumn = state[destinationId];
      const [movedTask] = sourceColumn.splice(sourceIndex, 1);
      
      if (destinationId === 'done' && movedTask.priority !== 'Completed') {
        movedTask.priority = 'Completed';
        movedTask.priorityColor = 'bg-green-100 text-green-500';
      } else if (sourceId === 'done' && destinationId !== 'done') {
        movedTask.priority = 'Low';
        movedTask.priorityColor = 'bg-orange-100 text-orange-500';
      }
      
      destColumn.splice(destinationIndex, 0, movedTask);
      saveState(state);
    },
    editTask: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string, updates: { title: string; description: string; priority: 'Low' | 'High' | 'Completed'; dueDate: string | null } }>) => {
      const { columnId, taskId, updates } = action.payload;
      const task = state[columnId].find(task => task.id === taskId);
      if (task) {
        task.title = updates.title;
        task.description = updates.description;
        task.priority = updates.priority;
        task.dueDate = updates.dueDate;
        if (updates.priority === 'Low') task.priorityColor = 'bg-orange-100 text-orange-500';
        else if (updates.priority === 'High') task.priorityColor = 'bg-red-100 text-red-500';
        else task.priorityColor = 'bg-green-100 text-green-500';
      }
      saveState(state);
    },
    deleteTask: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string }>) => {
      const { columnId, taskId } = action.payload;
      state[columnId] = state[columnId].filter(task => task.id !== taskId);
      saveState(state);
    },
    changeTaskPriority: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string }>) => {
      const { columnId, taskId } = action.payload;
      const task = state[columnId].find(task => task.id === taskId);
      if (task) {
        if (columnId === 'done') {
          if (task.priority === 'Low') task.priority = 'High';
          else if (task.priority === 'High') task.priority = 'Completed';
          else task.priority = 'Low';
        } else {
          task.priority = task.priority === 'Low' ? 'High' : 'Low';
        }
        if (task.priority === 'Low') task.priorityColor = 'bg-orange-100 text-orange-500';
        else if (task.priority === 'High') task.priorityColor = 'bg-red-100 text-red-500';
        else task.priorityColor = 'bg-green-100 text-green-500';
      }
      saveState(state);
    }
  },
});

export const { addTask, moveTask, editTask, deleteTask, changeTaskPriority } = tasksSlice.actions;

export default tasksSlice.reducer;