import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface TodoFormProps {
  addTodo: (text: string, description: string, dueDate: string | null, dueTime: string | null, subTasks: string[], priority: 'low' | 'medium' | 'high') => void;
  initialTodo?: Todo;
  onCancel?: () => void;
  readOnly?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, initialTodo, onCancel, readOnly = false }) => {
  const [text, setText] = useState(initialTodo?.text || '');
  const [description, setDescription] = useState(initialTodo?.description || '');
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate || '');
  const [dueTime, setDueTime] = useState(initialTodo?.dueTime || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTodo?.priority || 'medium');
  const [subTasks, setSubTasks] = useState<string[]>(initialTodo?.subTasks.map(st => st.text) || ['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !dueDate || !dueTime) {
      alert('Please fill in all required fields (Todo name, Due date, and Due time)');
      return;
    }
    
    addTodo(
      text.trim(),
      description.trim(),
      dueDate,
      dueTime,
      subTasks.filter(task => task.trim() !== ''),
      priority
    );

    if (!initialTodo) {
      setText('');
      setDescription('');
      setDueDate('');
      setDueTime('');
      setSubTasks(['']);
      setPriority('medium');
    }
    if (onCancel) onCancel();
  };

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, '']);
  };

  const handleRemoveSubTask = (index: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  const handleSubTaskChange = (index: number, value: string) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index] = value;
    setSubTasks(updatedSubTasks);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="todoText" className="block text-sm font-medium text-gray-700">
          Todo <span className="text-red-500">*</span>
        </label>
        <input
          id="todoText"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="mt-1 block w-full input"
          required
          disabled={readOnly}
        />
      </div>
      
      <div>
        <label htmlFor="todoDescription" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="todoDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          className="mt-1 block w-full input"
          rows={3}
          disabled={readOnly}
        />
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="todoDueDate" className="block text-sm font-medium text-gray-700">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            id="todoDueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full input"
            required
            disabled={readOnly}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="todoDueTime" className="block text-sm font-medium text-gray-700">
            Due Time <span className="text-red-500">*</span>
          </label>
          <input
            id="todoDueTime"
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="mt-1 block w-full input"
            required
            disabled={readOnly}
          />
        </div>
      </div>

      <div>
        <label htmlFor="todoPriority" className="block text-sm font-medium text-gray-700">Priority</label>
        <div className="mt-1 flex space-x-2">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              disabled={readOnly}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                priority === p
                  ? p === 'low'
                    ? 'bg-green-100 text-green-800'
                    : p === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sub-tasks</label>
        {subTasks.map((subTask, index) => (
          <div key={index} className="flex mt-2">
            <input
              type="text"
              value={subTask}
              onChange={(e) => handleSubTaskChange(index, e.target.value)}
              placeholder={`Sub-task ${index + 1}`}
              className="flex-grow input mr-2"
              disabled={readOnly}
            />
            {!readOnly && (
              <button
                type="button"
                onClick={() => handleRemoveSubTask(index)}
                className="btn btn-secondary"
              >
                <Minus size={18} />
              </button>
            )}
          </div>
        ))}
        {!readOnly && (
          <button
            type="button"
            onClick={handleAddSubTask}
            className="mt-2 btn btn-secondary w-full"
          >
            <Plus size={18} className="mr-2" /> Add Sub-task
          </button>
        )}
      </div>
      
      {!readOnly && (
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 btn btn-primary"
          >
            {initialTodo ? 'Update' : 'Add'} Todo
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default TodoForm;