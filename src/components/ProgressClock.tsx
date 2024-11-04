import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '../types';

interface ProgressClockProps {
  progress: number;
  activeSection: string;
  todos: Todo[];
}

const ProgressClock: React.FC<ProgressClockProps> = ({ progress, activeSection, todos }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateSectionProgress = () => {
    const sectionTodos = todos.filter(todo => todo.section === activeSection);
    if (sectionTodos.length === 0) return 0;

    const completedCount = sectionTodos.reduce((acc, todo) => {
      if (todo.status === 'completed') return acc + 100;
      if (todo.status === 'in-progress') return acc + 50;
      return acc;
    }, 0);

    return completedCount / sectionTodos.length;
  };

  const currentProgress = calculateSectionProgress();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 15;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (currentProgress / 100) * (2 * Math.PI);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#8b5cf6');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw clock hands with shadow
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Hour hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((hours + minutes / 60) * (Math.PI / 6));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.5);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Minute hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(minutes * (Math.PI / 30));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.7);
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Second hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(seconds * (Math.PI / 30));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.9);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw smaller center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

  }, [currentProgress]);

  return (
    <div className="mb-8">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="bg-white rounded-full shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {currentProgress.toFixed(0)}% Complete
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressClock;