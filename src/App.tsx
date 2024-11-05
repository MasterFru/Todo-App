import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, Plus, Star, Calendar as CalendarIcon, BarChart2, Moon, Sun } from 'lucide-react';
import { Todo, Section } from './types';
import SearchBar from './components/SearchBar';
import SectionList from './components/SectionList';
import TodoForm from './components/TodoForm';
import TodoDetails from './components/TodoDetails';
import ProgressClock from './components/ProgressClock';
import NotificationSystem from './components/NotificationSystem';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import ImportantTodos from './components/ImportantTodos';
import TodoActions from './components/TodoActions';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sections, setSections] = useState<Section[]>([
    { id: 'default', name: 'General' }
  ]);
  const [activeSection, setActiveSection] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'tasks' | 'calendar' | 'statistics' | 'important'>('tasks');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const completed = todos.filter(todo => todo.completed).length;
    setProgress((completed / todos.length) * 100 || 0);
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = todo.section === activeSection;
    return matchesSearch && matchesSection;
  });

  const addTodo = (text: string, description: string, dueDate: string | null, dueTime: string | null, subTasks: string[], priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      description,
      completed: false,
      important: false,
      dueDate,
      dueTime,
      section: activeSection,
      priority,
      subTasks: subTasks.map((text, index) => ({
        id: index,
        text,
        completed: false
      })),
      status: 'pending'
    };
    setTodos([...todos, newTodo]);
    setShowAddTodo(false);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleImportant = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodoStatus = (id: number, status: 'completed' | 'in-progress' | 'pending') => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status, completed: status === 'completed' } : todo
    ));
  };

  const addSection = (name: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      name
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (id: string) => {
    if (id === 'default') return;
    setSections(sections.filter(section => section.id !== id));
    if (activeSection === id) {
      setActiveSection('default');
    }
  };

  const editSection = (id: string, newName: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, name: newName } : section
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-violet-50 to-indigo-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm hover:shadow transition-all duration-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <SectionList
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              addSection={addSection}
              deleteSection={deleteSection}
              editSection={editSection}
            />
          </aside>

          <main className="md:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setView('tasks')}
                  className={`btn ${view === 'tasks' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <ListTodo size={20} className="mr-2" />
                  Tasks
                </button>
                <button
                  onClick={() => setView('important')}
                  className={`btn ${view === 'important' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <Star size={20} className="mr-2" />
                  Important
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <CalendarIcon size={20} className="mr-2" />
                  Calendar
                </button>
                <button
                  onClick={() => setView('statistics')}
                  className={`btn ${view === 'statistics' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <BarChart2 size={20} className="mr-2" />
                  Statistics
                </button>
              </div>
              <button
                onClick={() => setShowAddTodo(true)}
                className="btn btn-primary"
              >
                <Plus size={20} className="mr-2" />
                Add Todo
              </button>
            </div>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {view === 'tasks' && (
              <div className="dashboard-section">
                <ProgressClock
                  progress={progress}
                  activeSection={activeSection}
                  todos={todos}
                />
                
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredTodos.map((todo) => (
                      <motion.div
                        key={todo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`todo-item ${todo.important ? 'border-l-4 border-yellow-400' : ''}`}
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleTodo(todo.id)}
                              className="checkbox"
                            />
                            <button
                              onClick={() => toggleImportant(todo.id)}
                              className={`p-1 rounded-lg transition-colors ${
                                todo.important ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                              }`}
                            >
                              <Star size={20} />
                            </button>
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                              {todo.text}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                todo.priority === 'high'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : todo.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                                {todo.priority}
                              </span>
                              {todo.dueDate && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Due: {new Date(`${todo.dueDate}T${todo.dueTime || '00:00'}`).toLocaleDateString()}
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                todo.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : todo.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                              }`}>
                                {todo.status}
                              </span>
                            </div>
                          </div>
                          <TodoActions
                            todo={todo}
                            onView={() => setSelectedTodo(todo)}
                            onEdit={() => setEditingTodo(todo)}
                            onDelete={() => deleteTodo(todo.id)}
                            onStatusChange={(status) => updateTodoStatus(todo.id, status)}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {view === 'important' && (
              <ImportantTodos
                todos={todos.filter(todo => todo.important)}
                onTodoClick={setSelectedTodo}
                onStatusChange={updateTodoStatus}
                onEdit={setEditingTodo}
                onDelete={deleteTodo}
              />
            )}

            {view === 'calendar' && (
              <Calendar
                todos={todos}
                onTodoClick={setSelectedTodo}
              />
            )}

            {view === 'statistics' && (
              <Statistics todos={todos} />
            )}
          </main>
        </div>

        <AnimatePresence>
          {showAddTodo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowAddTodo(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold dark:text-white mb-4">Add New Todo</h2>
                <TodoForm
                  addTodo={addTodo}
                  onCancel={() => setShowAddTodo(false)}
                />
              </motion.div>
            </motion.div>
          )}

          {selectedTodo && (
            <TodoDetails
              todo={selectedTodo}
              onClose={() => setSelectedTodo(null)}
              onStatusChange={(status) => {
                updateTodoStatus(selectedTodo.id, status);
                setSelectedTodo(null);
              }}
            />
          )}

          {editingTodo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setEditingTodo(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold dark:text-white mb-4">Edit Todo</h2>
                <TodoForm
                  addTodo={(text, description, dueDate, dueTime, subTasks, priority) => {
                    setTodos(todos.map(todo =>
                      todo.id === editingTodo.id
                        ? { ...todo, text, description, dueDate, dueTime, subTasks: subTasks.map((text, index) => ({
                            id: index,
                            text,
                            completed: false
                          })), priority }
                        : todo
                    ));
                    setEditingTodo(null);
                  }}
                  initialTodo={editingTodo}
                  onCancel={() => setEditingTodo(null)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <NotificationSystem todos={todos} />
      </div>
    </div>
  );
}