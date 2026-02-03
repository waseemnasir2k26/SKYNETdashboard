import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';

export default function FocusMode() {
  const { toggleFocusMode, getCurrentWeek, tasks, toggleTask } = useStore();
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const currentWeek = getCurrentWeek();
  const weekData = GROWTH_PLAN.weeks.find(w => w.number === currentWeek);
  const pendingTasks = weekData?.tasks.filter(t => !tasks[t.id]?.completed) || [];

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      setSessions((prev) => prev + 1);
      // Play notification sound here if desired
      setTimer(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timer) / (25 * 60)) * 100;

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Exit Button */}
        <motion.button
          onClick={toggleFocusMode}
          className="absolute -top-12 right-0 flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
          <span>Exit Focus Mode</span>
        </motion.button>

        {/* Timer Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Focus Mode</h1>
            <p className="text-gray-500">Stay focused on your current week's tasks</p>
          </div>

          {/* Timer Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#2d2d2d"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#timerGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '754', strokeDashoffset: '754' }}
                animate={{ strokeDashoffset: 754 - (754 * progress) / 100 }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold font-mono">{formatTime(timer)}</span>
              <span className="text-gray-500 mt-2">
                {sessions} sessions completed
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setTimer(25 * 60)}
              className="p-4 bg-dark-input rounded-xl hover:bg-dark-border transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => setIsRunning(!isRunning)}
              className="p-6 bg-gradient-to-r from-accent-primary to-purple-600 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRunning ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setTimer(timer === 25 * 60 ? 5 * 60 : 25 * 60)}
              className="p-4 bg-dark-input rounded-xl hover:bg-dark-border transition-colors text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {timer === 25 * 60 || timer > 5 * 60 ? '5min' : '25min'}
            </motion.button>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Week {currentWeek} Tasks ({pendingTasks.length} pending)
          </h2>

          {pendingTasks.length > 0 ? (
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {pendingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-dark-secondary rounded-xl cursor-pointer hover:bg-dark-input transition-colors"
                  onClick={() => toggleTask(task.id, task.points)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-5 h-5 rounded-md border-2 border-dark-border-light flex items-center justify-center mt-0.5">
                    {tasks[task.id]?.completed && (
                      <CheckCircle2 className="w-4 h-4 text-accent-success" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  </div>
                  <span className="text-xs text-accent-warning font-medium">
                    +{task.points}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🎉</span>
              <p className="text-gray-500">All tasks completed for this week!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
