import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Todo } from '../types';
import TodoActions from './TodoActions';

interface ImportantTodosProps {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
  onStatusChange: (id: number, status: 'completed' | 'in-progress' | 'pending') => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const ImportantTodos: React.FC<ImportantTodosProps> = ({
  todos,
  onTodoClick,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const importantTodos = todos.filter(todo => todo.important);

  return (
    <div className="dashboard-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Star className="mr-2 text-yellow-500" size={24} />
          Important Tasks
        </h2>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {importantTodos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onTodoClick(todo)}
                >
                  <h3 className="font-medium text-gray-900">{todo.text}</h3>
                  {todo.description && (
                    <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                  )}
                  <div className="flex items-center mt-2 space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        todo.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : todo.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {todo.priority}
                    </span>
                    {todo.dueDate && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(`${todo.dueDate}T${todo.dueTime || '00:00'}`).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      todo.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : todo.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {todo.status || 'pending'}
                    </span>
                  </div>
                </div>
                <TodoActions
                  todo={todo}
                  onEdit={() => onEdit(todo)}
                  onDelete={() => onDelete(todo.id)}
                  onStatusChange={(status) => onStatusChange(todo.id, status)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {importantTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Star className="mx-auto mb-2 text-gray-400" size={32} />
            <p>No important tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantTodos;