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
        className="p-2 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/50 rounded-lg transition-colors"
      >
        <Eye size={18} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEdit}
        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
      >
        <Edit2 size={18} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDelete}
        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </motion.button>
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <MoreVertical size={18} />
        </motion.button>
        
        <AnimatePresence>
          {showStatusMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 z-10 border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => {
                  onStatusChange('completed');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Check size={16} className="mr-2 text-green-500 dark:text-green-400" />
                Mark as Completed
              </button>
              <button
                onClick={() => {
                  onStatusChange('in-progress');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Clock size={16} className="mr-2 text-blue-500 dark:text-blue-400" />
                Mark as In Progress
              </button>
              <button
                onClick={() => {
                  onStatusChange('pending');
                  setShowStatusMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <AlertCircle size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
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