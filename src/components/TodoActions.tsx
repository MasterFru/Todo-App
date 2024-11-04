import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit2, Trash2, Clock, Check, AlertCircle, MoreVertical } from 'lucide-react';
import { Todo } from '../types';

interface TodoActionsProps {
  todo: Todo;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: 'completed' | 'in-progress' | 'pending') => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({ todo, onView, onEdit, onDelete, onStatusChange }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onView}
        className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
      >
        <Eye size={18} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEdit}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Edit2 size={18} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </motion.button>
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical size={18} />
        </motion.button>
        
        <AnimatePresence>
          {showStatusMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10 border border-gray-100"
            >
              <button
                onClick={() => {
                  onStatusChange('completed');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Check size={16} className="mr-2 text-green-500" />
                Mark as Completed
              </button>
              <button
                onClick={() => {
                  onStatusChange('in-progress');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Clock size={16} className="mr-2 text-blue-500" />
                Mark as In Progress
              </button>
              <button
                onClick={() => {
                  onStatusChange('pending');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <AlertCircle size={16} className="mr-2 text-gray-500" />
                Mark as Pending
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoActions;