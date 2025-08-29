import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Activity {
  action: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'High' | 'Completed';
  priorityColor: string;
  comments: number;
  files: number;
  members: string[];
  dueDate: string | null;
  activity: Activity[];
  subtasks: Subtask[]; // ADDED: subtasks array for each task
}

interface TasksState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const saveState = (state: TasksState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const loadState = (): TasksState => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      // ADDED: Initialize subtasks array in default data
      return {
        todo: [ { id: "1", title: "Brainstorming", description: "Brainstorming brings team members' diverse experience into play.", priority: "Low", priorityColor: "bg-orange-100 text-orange-500", comments: 12, files: 0, members: ["https://i.pravatar.cc/24?img=1"], dueDate: null, activity: [], subtasks: [] } ],
        inProgress: [ { id: "4", title: "Onboarding Illustrations", description: "...", priority: "Low", priorityColor: "bg-orange-100 text-orange-500", comments: 14, files: 15, members: ["https://i.pravatar.cc/24?img=5"], dueDate: "2025-09-15", activity: [], subtasks: [{ id: 'sub1', text: 'Create initial sketches', completed: true }, { id: 'sub2', text: 'Finalize illustrations', completed: false }] } ],
        done: [ { id: "7", title: "Design System", description: "It just needs to adapt the UI from what you did before.", priority: "Completed", priorityColor: "bg-green-100 text-green-500", comments: 12, files: 15, members: ["https://i.pravatar.cc/24?img=9"], dueDate: "2025-08-20", activity: [], subtasks: [] } ]
      };
    }
    const loadedState = JSON.parse(serializedState) as TasksState;
    // Ensure loaded tasks from older versions have the new properties
    Object.values(loadedState).forEach((column: Task[]) => column.forEach(task => {
      if (!task.activity) task.activity = [];
      if (!task.subtasks) task.subtasks = [];
    }));
    return loadedState;
  } catch (err) {
    return { todo: [], inProgress: [], done: [] };
  }
};

const initialState: TasksState = loadState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string; priority: 'Low' | 'High'; dueDate: string | null }>) => {
      const { title, description, priority, dueDate } = action.payload;
      const priorityColor = priority === 'Low' ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500';
      const newTask: Task = {
        id: crypto.randomUUID(),
        title, description, priority, dueDate, priorityColor,
        comments: 0, files: 0, members: [],
        activity: [{ action: `Task created`, timestamp: new Date().toISOString() }],
        subtasks: [],
      };
      state.todo.push(newTask);
      saveState(state);
    },
    moveTask: (state, action: PayloadAction<{ sourceId: keyof TasksState, destinationId: keyof TasksState, sourceIndex: number, destinationIndex: number }>) => {
      const { sourceId, destinationId, sourceIndex, destinationIndex } = action.payload;
      const sourceColumn = state[sourceId];
      const [movedTask] = sourceColumn.splice(sourceIndex, 1);
      movedTask.activity.push({ action: `Moved from '${sourceId}' to '${destinationId}'`, timestamp: new Date().toISOString() });
      if (destinationId === 'done' && movedTask.priority !== 'Completed') {
        movedTask.priority = 'Completed';
        movedTask.priorityColor = 'bg-green-100 text-green-500';
      } else if (sourceId === 'done' && destinationId !== 'done') {
        movedTask.priority = 'Low';
        movedTask.priorityColor = 'bg-orange-100 text-orange-500';
      }
      state[destinationId].splice(destinationIndex, 0, movedTask);
      saveState(state);
    },
    editTask: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string, updates: { title: string; description: string; priority: 'Low' | 'High' | 'Completed'; dueDate: string | null } }>) => {
      const { columnId, taskId, updates } = action.payload;
      const task = state[columnId].find(t => t.id === taskId);
      if (task) {
        task.activity.push({ action: `Task details updated`, timestamp: new Date().toISOString() });
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
      const task = state[columnId].find(t => t.id === taskId);
      if (task) {
        const oldPriority = task.priority;
        if (columnId === 'done') {
          if (task.priority === 'Low') task.priority = 'High';
          else if (task.priority === 'High') task.priority = 'Completed';
          else task.priority = 'Low';
        } else {
          task.priority = task.priority === 'Low' ? 'High' : 'Low';
        }
        if(oldPriority !== task.priority) {
          task.activity.push({ action: `Priority changed from '${oldPriority}' to '${task.priority}'`, timestamp: new Date().toISOString() });
        }
        if (task.priority === 'Low') task.priorityColor = 'bg-orange-100 text-orange-500';
        else if (task.priority === 'High') task.priorityColor = 'bg-red-100 text-red-500';
        else task.priorityColor = 'bg-green-100 text-green-500';
      }
      saveState(state);
    },
    addSubtask: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string, text: string }>) => {
      const { columnId, taskId, text } = action.payload;
      const task = state[columnId].find(t => t.id === taskId);
      if (task) {
        const newSubtask: Subtask = {
          id: crypto.randomUUID(),
          text,
          completed: false,
        };
        task.subtasks.push(newSubtask);
        task.activity.push({ action: `Added subtask: "${text}"`, timestamp: new Date().toISOString() });
        saveState(state);
      }
    },
    toggleSubtask: (state, action: PayloadAction<{ columnId: keyof TasksState, taskId: string, subtaskId: string }>) => {
      const { columnId, taskId, subtaskId } = action.payload;
      const task = state[columnId].find(t => t.id === taskId);
      if (task) {
        const subtask = task.subtasks.find(st => st.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          const status = subtask.completed ? 'completed' : 'incomplete';
          task.activity.push({ action: `Marked subtask "${subtask.text}" as ${status}`, timestamp: new Date().toISOString() });
          saveState(state);
        }
      }
    }
  },
});

export const { addTask, moveTask, editTask, deleteTask, changeTaskPriority, addSubtask, toggleSubtask } = tasksSlice.actions;

export default tasksSlice.reducer;