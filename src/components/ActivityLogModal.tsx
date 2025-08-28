// src/components/ActivityLogModal.tsx

import { X, History } from 'lucide-react';
import type { Activity } from '../redux/tasksSlice';

interface ActivityLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
}

export default function ActivityLogModal({ isOpen, onClose, activities }: ActivityLogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History size={22} /> Activity Log
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
          {activities && activities.length > 0 ? (
            [...activities].reverse().map((activity, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No activity to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}