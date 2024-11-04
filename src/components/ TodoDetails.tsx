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
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Todo Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <TodoForm
            addTodo={() => {}}
            initialTodo={todo}
            readOnly={true}
          />

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Status</h4>
            <div className="space-y-4">
              <div className={`px-3 py-2 rounded-lg ${getStatusColor(todo.status)}`}>
                Current Status: {todo.status || 'pending'}
              </div>

              {todo.status === 'in-progress' && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(todo)}%` }}
                  ></div>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => onStatusChange('completed')}
                  className="flex-1 btn bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check size={16} className="mr-2" /> Complete
                </button>
                <button
                  onClick={() => onStatusChange('in-progress')}
                  className="flex-1 btn bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Clock size={16} className="mr-2" /> In Progress
                </button>
                <button
                  onClick={() => onStatusChange('pending')}
                  className="flex-1 btn bg-gray-500 hover:bg-gray-600 text-white"
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