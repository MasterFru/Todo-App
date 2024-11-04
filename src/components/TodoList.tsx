// Update the priority button in TodoList.tsx to be non-clickable
<span className={`text-xs px-2 py-1 rounded ${getPriorityColor(todo.priority)}`}>
  {todo.priority}
</span>