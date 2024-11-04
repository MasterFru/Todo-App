import React from 'react';
import { Todo } from '../types';
import { Star, Trash2 } from 'lucide-react';

interface FavoriteTodosProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updates: Partial<Todo>) => void;
}

const FavoriteTodos: React.FC<FavoriteTodosProps> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2 text-primary">Favorite Todos</h3>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => editTodo(todo.id, { favorite: false })}
                className="text-yellow-500 hover:text-yellow-600 mr-2"
              >
                <Star size={18} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteTodos;