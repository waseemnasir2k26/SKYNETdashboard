import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Flame,
  TrendingUp,
  Zap,
  Plus,
  ChevronRight,
  Trophy,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useGoalsStore } from '../store/useGoalsStore';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';

export default function GoalPainPoint() {
  const { getPrimaryGoal, incrementProgress, calculateBreakdown, getAllGoals } = useGoalsStore();
  const { currentUser } = useAuthStore();
  const { setActiveTab } = useStore();

  const [showQuickUpdate, setShowQuickUpdate] = useState(false);

  const primaryGoal = getPrimaryGoal();

  // If no goals set, show prompt to set goals
  if (!primaryGoal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-violet-600/30 rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Set Your Goals</h3>
              <p className="text-gray-300 text-sm">
                Define your targets to see your daily breakdown
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('goals')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
          >
            Set Goals
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const breakdown = calculateBreakdown(primaryGoal);
  const firstName = currentUser?.name?.split(' ')[0] || 'Hey';
  const remaining = primaryGoal.target - primaryGoal.current;
  const isOnTrack = breakdown.onTrack;

  // Generate pain point message
  const getPainPointMessage = () => {
    const percentDone = breakdown.percentComplete;

    if (percentDone >= 100) {
      return `You did it! ${primaryGoal.target} ${primaryGoal.unit} completed!`;
    } else if (percentDone >= 75) {
      return `Almost there! Just ${remaining} more ${primaryGoal.unit} to go!`;
    } else if (percentDone >= 50) {
      return `Halfway through! ${remaining} ${primaryGoal.unit} left to crush!`;
    } else if (percentDone >= 25) {
      return `Good progress! ${remaining} ${primaryGoal.unit} more to freedom!`;
    } else {
      return `${remaining} ${primaryGoal.unit} to go - let's get after it!`;
    }
  };

  const handleQuickIncrement = () => {
    incrementProgress(primaryGoal.type, primaryGoal.quarter);
    setShowQuickUpdate(true);
    setTimeout(() => setShowQuickUpdate(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Main pain point card with pulsing effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(99, 102, 241, 0.2)',
            '0 0 40px rgba(99, 102, 241, 0.3)',
            '0 0 20px rgba(99, 102, 241, 0.2)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-gradient-to-r from-indigo-600/40 via-purple-600/40 to-pink-600/40 rounded-2xl border border-indigo-500/40"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              >
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <span className="text-xs text-indigo-300 uppercase tracking-wider font-medium">
                  {primaryGoal.type === 'yearly' ? 'Yearly Goal' :
                   primaryGoal.type === 'ninetyDay' ? '90-Day Focus' :
                   primaryGoal.type === 'thirtyDay' ? '30-Day Sprint' : 'Goal'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{primaryGoal.title}</h2>
                {primaryGoal.milestoneReward && (
                  <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="truncate">{primaryGoal.milestoneReward}</span>
                  </p>
                )}
              </div>
            </div>

            {/* On Track Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full self-start sm:self-auto flex-shrink-0 ${
              isOnTrack
                ? 'bg-green-500/20 text-green-400'
                : 'bg-orange-500/20 text-orange-400'
            }`}>
              {isOnTrack ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">On Track</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Push Harder</span>
                </>
              )}
            </div>
          </div>

          {/* Pain Point Message */}
          <div className="bg-black/20 rounded-xl p-4 mb-4">
            <p className="text-lg text-center">
              <span className="text-gray-400">Hey {firstName},</span>{' '}
              <span className="font-bold text-white">{getPainPointMessage()}</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium text-white">
                {primaryGoal.current} / {primaryGoal.target} {primaryGoal.unit}
              </span>
            </div>
            <div className="h-4 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${breakdown.percentComplete}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                {breakdown.daysRemaining} days remaining
              </span>
              <span className="text-xs font-medium text-indigo-400">
                {breakdown.percentComplete}%
              </span>
            </div>
          </div>

          {/* Daily/Weekly Targets */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            <div className="bg-black/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-400">Daily</span>
              </div>
              <p className="text-xl font-bold text-white">{breakdown.dailyTarget}</p>
              <p className="text-xs text-gray-500">{primaryGoal.unit}/day</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Weekly</span>
              </div>
              <p className="text-xl font-bold text-white">{breakdown.weeklyTarget}</p>
              <p className="text-xs text-gray-500">{primaryGoal.unit}/week</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">Monthly</span>
              </div>
              <p className="text-xl font-bold text-white">{breakdown.monthlyTarget}</p>
              <p className="text-xs text-gray-500">{primaryGoal.unit}/month</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleQuickIncrement}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Log +1 {primaryGoal.unit.replace(/s$/, '')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('goals')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-input text-gray-300 hover:text-white font-medium rounded-xl border border-dark-border hover:border-indigo-500/50 transition-all"
            >
              View All Goals
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Quick update feedback */}
          {showQuickUpdate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg"
            >
              +1 Added!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
