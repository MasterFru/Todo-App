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

  // Calculate percentages for pie chart
  const calculatePercentage = (value: number) => ((value / total) * 100) || 0;
  const completedPercentage = calculatePercentage(completed);
  const inProgressPercentage = calculatePercentage(inProgress);
  const pendingPercentage = calculatePercentage(pending);

  return (
    <div className="space-y-6">
      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PieChart className="mr-2 text-violet-600" />
          Task Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-violet-50 rounded-xl">
            <p className="text-sm text-violet-600 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-violet-900">{total}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-900">{completed}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl">
            <p className="text-sm text-yellow-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-900">{inProgress}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{pending}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="20"
              />
              {/* Completed segment */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray={`${completedPercentage} ${100 - completedPercentage}`}
                strokeDashoffset="25"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${completedPercentage} ${100 - completedPercentage}` }}
                transition={{ duration: 1 }}
              />
              {/* In Progress segment */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="20"
                strokeDasharray={`${inProgressPercentage} ${100 - inProgressPercentage}`}
                strokeDashoffset={-75 + completedPercentage}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${inProgressPercentage} ${100 - inProgressPercentage}` }}
                transition={{ duration: 1 }}
              />
              {/* Pending segment */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="20"
                strokeDasharray={`${pendingPercentage} ${100 - pendingPercentage}`}
                strokeDashoffset={-75 + completedPercentage + inProgressPercentage}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${pendingPercentage} ${100 - pendingPercentage}` }}
                transition={{ duration: 1 }}
              />
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-sm">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="mr-2 text-violet-600" />
          Priority Distribution
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-600">High Priority</span>
              <span className="font-medium">{priorityStats.high}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.high / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600">Medium Priority</span>
              <span className="font-medium">{priorityStats.medium}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="bg-yellow-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.medium / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Low Priority</span>
              <span className="font-medium">{priorityStats.low}</span>
            </div>
            <motion.div 
              className="w-full bg-gray-200 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(priorityStats.low / total) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-violet-600" />
          Completion Rate
        </h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-violet-600 bg-violet-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-violet-600">
                {total > 0 ? ((completed / total) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
          <motion.div 
            className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-violet-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
              transition={{ duration: 1 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-500"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;