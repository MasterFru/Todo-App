import React, { useState, useEffect } from 'react';
import { Todo } from '../types';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationSystemProps {
  todos: Todo[];
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ todos }) => {
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'warning' | 'info' }>>([]);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const result = await Notification.requestPermission();
      setPermission(result);
    };

    if (permission === 'default') {
      requestNotificationPermission();
    }
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const newNotifications: Array<{ id: string; message: string; type: 'warning' | 'info' }> = [];

      todos.forEach(todo => {
        if (todo.dueDate && todo.dueTime && !todo.completed) {
          const dueDateTime = new Date(`${todo.dueDate}T${todo.dueTime}`);
          const timeDiff = dueDateTime.getTime() - now.getTime();
          const minutesUntilDue = Math.floor(timeDiff / (1000 * 60));

          if (minutesUntilDue <= 60 && minutesUntilDue > 0) {
            const notificationId = `${todo.id}-${minutesUntilDue}`;
            const message = `"${todo.text}" is due in ${minutesUntilDue} minute${minutesUntilDue === 1 ? '' : 's'}!`;

            // Show browser notification
            if (permission === 'granted' && minutesUntilDue === 15) {
              new Notification('Todo Reminder', {
                body: message,
                icon: '/notification-icon.png'
              });
            }

            newNotifications.push({
              id: notificationId,
              message,
              type: minutesUntilDue <= 15 ? 'warning' : 'info'
            });
          } else if (timeDiff < 0 && timeDiff > -3600000) { // Within the last hour
            const notificationId = `${todo.id}-overdue`;
            newNotifications.push({
              id: notificationId,
              message: `"${todo.text}" is overdue!`,
              type: 'warning'
            });
          }
        }
      });

      setNotifications(newNotifications);
    };

    checkNotifications();
    const intervalId = setInterval(checkNotifications, 60000);

    return () => clearInterval(intervalId);
  }, [todos, permission]);

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm space-y-2 z-50">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`glass-effect rounded-xl p-4 shadow-lg flex items-center justify-between ${
              type === 'warning'
                ? 'border-l-4 border-red-500 dark:border-red-600'
                : 'border-l-4 border-blue-500 dark:border-blue-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Bell className={`h-5 w-5 ${
                  type === 'warning' ? 'text-red-500' : 'text-blue-500'
                }`} />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">{message}</p>
            </div>
            <button
              onClick={() => removeNotification(id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
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