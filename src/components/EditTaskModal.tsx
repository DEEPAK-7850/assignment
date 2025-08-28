// src/components/EditTaskModal.tsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { editTask, Task } from '../redux/tasksSlice';
import { X } from 'lucide-react';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  columnId: 'todo' | 'inProgress' | 'done';
}

export default function EditTaskModal({ isOpen, onClose, task, columnId }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'High' | 'Completed'>('Low');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(editTask({ columnId, taskId: task.id, updates: { title, description, priority } }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded-md" required />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select id="edit-priority" value={priority} onChange={(e) => setPriority(e.target.value as any)} className="w-full mt-1 p-2 border rounded-md">
                <option value="Low">Low</option>
                <option value="High">High</option>
                {columnId === 'done' && <option value="Completed">Completed</option>}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}