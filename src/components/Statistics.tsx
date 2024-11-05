import React from 'react';
import { Todo } from '../types';
import { PieChart, BarChart2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatisticsProps {
  todos: Todo[];
}

const Statistics: React.FC<StatisticsProps> = ({ todos }) => {
  const completed = todos.filter(t => t.completed).length;
  const inProgress = todos.filter(t => t.status === 'in-progress').length;
  const pending = todos.filter(t => t.status === 'pending').length;
  const total = todos.length;

  const priorityStats = {
    high: todos.filter(t => t.priority === 'high').length,
    medium: todos.filter(t => t.priority === 'medium').length,
    low: todos.filter(t => t.priority === 'low').length,
  };

  const calculatePercentage = (value: number) => ((value / total) * 100) || 0;
  const completedPercentage = calculatePercentage(completed);
  const inProgressPercentage = calculatePercentage(inProgress);
  const pendingPercentage = calculatePercentage(pending);

  return (
    <div className="space-y-6">
      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
          <PieChart className="mr-2 text-violet-600 dark:text-violet-400" />
          Task Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-violet-50 dark:bg-violet-900/30 rounded-xl">
            <p className="text-sm text-violet-600 dark:text-violet-300 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">{total}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
            <p className="text-sm text-green-600 dark:text-green-300 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{completed}</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
            <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{inProgress}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pending}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                className="text-gray-200 dark:text-gray-700"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray={`${completedPercentage} ${100 - completedPercentage}`}
                className="text-green-500 dark:text-green-400"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${completedPercentage} ${100 - completedPercentage}` }}
                transition={{ duration: 1 }}
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray={`${inProgressPercentage} ${100 - inProgressPercentage}`}
                strokeDashoffset={-completedPercentage}
                className="text-yellow-500 dark:text-yellow-400"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${inProgressPercentage} ${100 - inProgressPercentage}` }}
                transition={{ duration: 1 }}
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray={`${pendingPercentage} ${100 - pendingPercentage}`}
                strokeDashoffset={-(completedPercentage + inProgressPercentage)}
                className="text-gray-400 dark:text-gray-500"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${pendingPercentage} ${100 - pendingPercentage}` }}
                transition={{ duration: 1 }}
              />
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm dark:text-gray-300">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-sm dark:text-gray-300">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></div>
              <span className="text-sm dark:text-gray-300">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
          <BarChart2 className="mr-2 text-violet-600 dark:text-violet-400" />
          Priority Distribution
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-600 dark:text-red-400">High Priority</span>
              <span className="font-medium dark:text-gray-300">{priorityStats.high}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-red-500 dark:bg-red-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.high / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600 dark:text-yellow-400">Medium Priority</span>
              <span className="font-medium dark:text-gray-300">{priorityStats.medium}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="bg-yellow-500 dark:bg-yellow-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.medium / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600 dark:text-green-400">Low Priority</span>
              <span className="font-medium dark:text-gray-300">{priorityStats.low}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="bg-green-500 dark:bg-green-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.low / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
          <TrendingUp className="mr-2 text-violet-600 dark:text-violet-400" />
          Completion Rate
        </h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-violet-600 dark:text-violet-300 bg-violet-200 dark:bg-violet-900">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-violet-600 dark:text-violet-300">
                {total > 0 ? ((completed / total) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
          <motion.div 
            className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-violet-200 dark:bg-violet-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
              transition={{ duration: 1 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-500 dark:bg-violet-600"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;