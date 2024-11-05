import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, X, AlertCircle } from 'lucide-react';
import TodoForm from './TodoForm';
import { Todo } from '../types';

interface TodoDetailsProps {
  todo: Todo;
  onClose: () => void;
  onStatusChange: (status: 'completed' | 'in-progress' | 'pending') => void;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todo, onClose, onStatusChange }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200';
      case 'pending':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getProgressPercentage = (todo: Todo) => {
    if (todo.status === 'completed') return 100;
    if (todo.status === 'in-progress') return 50;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Todo Details</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <TodoForm
            addTodo={() => {}}
            initialTodo={todo}
            readOnly={true}
          />

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Status</h4>
            <div className="space-y-4">
              <div className={`px-3 py-2 rounded-lg ${getStatusColor(todo.status)}`}>
                Current Status: {todo.status || 'pending'}
              </div>

              {todo.status === 'in-progress' && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-yellow-500 dark:bg-yellow-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(todo)}%` }}
                  ></div>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => onStatusChange('completed')}
                  className="flex-1 btn bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white"
                >
                  <Check size={16} className="mr-2" /> Complete
                </button>
                <button
                  onClick={() => onStatusChange('in-progress')}
                  className="flex-1 btn bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
                >
                  <Clock size={16} className="mr-2" /> In Progress
                </button>
                <button
                  onClick={() => onStatusChange('pending')}
                  className="flex-1 btn bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white"
                >
                  <AlertCircle size={16} className="mr-2" /> Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoDetails;