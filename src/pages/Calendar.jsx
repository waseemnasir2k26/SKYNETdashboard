import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Flame,
  Target,
  Calendar as CalendarIcon,
  Zap
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';
import toast from 'react-hot-toast';

export default function Calendar() {
  const {
    dailyHabits,
    toggleDailyHabit,
    streak,
    getCurrentWeek,
    getTodayHabitsProgress
  } = useStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getDateKey = (date) => format(date, 'yyyy-MM-dd');

  const getDayProgress = (date) => {
    const dateKey = getDateKey(date);
    const dayHabits = dailyHabits[dateKey] || {};
    const completed = Object.values(dayHabits).filter(Boolean).length;
    return {
      completed,
      total: GROWTH_PLAN.dailyHabits.length,
      percentage: GROWTH_PLAN.dailyHabits.length > 0
        ? Math.round((completed / GROWTH_PLAN.dailyHabits.length) * 100)
        : 0
    };
  };

  const selectedDateKey = getDateKey(selectedDate);
  const selectedDayHabits = dailyHabits[selectedDateKey] || {};
  const selectedProgress = getDayProgress(selectedDate);

  const handleHabitToggle = (habit) => {
    // Only allow toggling for today
    if (!isToday(selectedDate)) {
      toast.error("Can only update today's habits!", { icon: '⚠️' });
      return;
    }
    toggleDailyHabit(habit.id, habit.points);
    if (!selectedDayHabits[habit.id]) {
      toast.success(`+${habit.points} points! Keep it up!`, { icon: '🔥' });
    }
  };

  const currentWeek = getCurrentWeek();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Habit Calendar</h1>
          <p className="text-gray-500">Track your daily consistency</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-xl border border-orange-500/30">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="font-bold text-orange-400">{streak.current}</span>
            <span className="text-sm text-gray-400">day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl border border-dark-border">
            <Target className="w-5 h-5 text-accent-primary" />
            <span className="text-sm text-gray-400">Best: {streak.longest} days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <motion.button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const progress = getDayProgress(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isDayToday = isToday(day);
              const isSelected = isSameDay(day, selectedDate);
              const isPerfectDay = progress.percentage === 100 && progress.total > 0;

              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`relative p-2 rounded-xl aspect-square flex flex-col items-center justify-center transition-all
                    ${!isCurrentMonth ? 'opacity-30' : ''}
                    ${isSelected ? 'bg-accent-primary text-white' : 'hover:bg-white/5'}
                    ${isDayToday && !isSelected ? 'ring-2 ring-accent-primary' : ''}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-sm font-medium ${!isCurrentMonth ? 'text-gray-600' : ''}`}>
                    {format(day, 'd')}
                  </span>

                  {/* Progress Indicator */}
                  {isCurrentMonth && progress.completed > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(Math.min(progress.completed, 5))].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white' : isPerfectDay ? 'bg-accent-success' : 'bg-accent-primary'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Fire icon for perfect days */}
                  {isPerfectDay && !isSelected && (
                    <span className="absolute -top-1 -right-1 text-xs">🔥</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-dark-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-primary" />
              <span className="text-xs text-gray-500">Partial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-success" />
              <span className="text-xs text-gray-500">Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🔥</span>
              <span className="text-xs text-gray-500">Perfect Day</span>
            </div>
          </div>
        </motion.div>

        {/* Selected Day Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {format(selectedDate, 'EEEE')}
              </h3>
              <p className="text-sm text-gray-500">
                {format(selectedDate, 'MMMM d, yyyy')}
              </p>
            </div>
            {isToday(selectedDate) && (
              <span className="badge bg-accent-primary/20 text-accent-primary">Today</span>
            )}
          </div>

          {/* Progress Ring */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#2d2d2d"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '352', strokeDashoffset: '352' }}
                animate={{
                  strokeDashoffset: 352 - (352 * selectedProgress.percentage) / 100
                }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{selectedProgress.percentage}%</span>
              <span className="text-xs text-gray-500">
                {selectedProgress.completed}/{selectedProgress.total}
              </span>
            </div>
          </div>

          {/* Daily Habits List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Daily Habits</h4>
            {GROWTH_PLAN.dailyHabits.map((habit) => {
              const isCompleted = selectedDayHabits[habit.id];
              const canToggle = isToday(selectedDate);

              return (
                <motion.div
                  key={habit.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all
                    ${canToggle ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}
                    ${isCompleted
                      ? 'bg-accent-success/10 border border-accent-success/30'
                      : 'bg-dark-secondary border border-transparent'
                    }
                    ${canToggle && !isCompleted ? 'hover:border-accent-primary/50' : ''}
                  `}
                  onClick={() => handleHabitToggle(habit)}
                  whileHover={canToggle ? { scale: 1.02 } : {}}
                  whileTap={canToggle ? { scale: 0.98 } : {}}
                >
                  <span className="text-xl">{habit.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {habit.title}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                    ${isCompleted
                      ? 'border-accent-success bg-accent-success'
                      : 'border-dark-border-light'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Points Summary */}
          <div className="mt-4 p-4 bg-gradient-to-r from-accent-warning/20 to-orange-500/20 rounded-xl border border-accent-warning/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-warning" />
                <span className="text-sm font-medium">Points Earned</span>
              </div>
              <span className="text-lg font-bold text-accent-warning">
                +{GROWTH_PLAN.dailyHabits.reduce((sum, h) =>
                  sum + (selectedDayHabits[h.id] ? h.points : 0), 0
                )}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(() => {
            const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
            const perfectDays = monthDays.filter(d => getDayProgress(d).percentage === 100).length;
            const activeDays = monthDays.filter(d => getDayProgress(d).completed > 0).length;
            const totalHabitsCompleted = monthDays.reduce((sum, d) => sum + getDayProgress(d).completed, 0);
            const avgCompletion = monthDays.length > 0
              ? Math.round(monthDays.reduce((sum, d) => sum + getDayProgress(d).percentage, 0) / monthDays.length)
              : 0;

            return [
              { label: 'Perfect Days', value: perfectDays, icon: '🔥' },
              { label: 'Active Days', value: activeDays, icon: '✅' },
              { label: 'Total Habits', value: totalHabitsCompleted, icon: '📊' },
              { label: 'Avg Completion', value: `${avgCompletion}%`, icon: '📈' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-secondary rounded-xl p-4 text-center"
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ));
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}
