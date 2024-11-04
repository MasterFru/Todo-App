import React from 'react';
import { Todo } from '../types';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationSystemProps {
  todos: Todo[];
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ todos }) => {
  const [notifications, setNotifications] = React.useState<string[]>([]);

  React.useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const newNotifications = todos
        .filter(todo => {
          if (todo.dueDate && todo.dueTime) {
            const dueDateTime = new Date(`${todo.dueDate}T${todo.dueTime}`);
            const timeDiff = dueDateTime.getTime() - now.getTime();
            return timeDiff > 0 && timeDiff <= 15 * 60 * 1000;
          }
          return false;
        })
        .map(todo => `"${todo.text}" is due in 15 minutes or less!`);

      setNotifications(newNotifications);
    };

    checkNotifications();
    const intervalId = setInterval(checkNotifications, 60000);

    return () => clearInterval(intervalId);
  }, [todos]);

  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm space-y-2">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="glass-effect rounded-xl p-4 shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-primary-500" />
              </div>
              <p className="text-sm text-gray-700">{notification}</p>
            </div>
            <button
              onClick={() => removeNotification(index)}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;