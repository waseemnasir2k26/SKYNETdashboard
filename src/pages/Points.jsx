import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Star,
  Zap,
  Target,
  Lock,
  CheckCircle2,
  Flame,
  TrendingUp,
  Award,
  Crown,
  Gift
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';

export default function Points() {
  const {
    points,
    earnedBadges,
    streak,
    getCurrentLevel,
    getOverallProgress,
    getCompletedTasksCount,
    getTotalTasks
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview');

  const currentLevel = getCurrentLevel();
  const overallProgress = getOverallProgress();
  const completedTasks = getCompletedTasksCount();
  const totalTasks = getTotalTasks();

  // Calculate points breakdown
  const pointsBreakdown = {
    tasks: Object.keys(points).length > 0 ? Math.round(points.total * 0.6) : 0,
    habits: Object.keys(points).length > 0 ? Math.round(points.total * 0.25) : 0,
    content: Object.keys(points).length > 0 ? Math.round(points.total * 0.1) : 0,
    streakBonus: streak.current * 5,
  };

  const earnedBadgesList = GROWTH_PLAN.badges.filter(b => earnedBadges.includes(b.id));
  const lockedBadges = GROWTH_PLAN.badges.filter(b => !earnedBadges.includes(b.id));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'levels', label: 'Levels', icon: TrendingUp },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'rewards', label: 'Rewards', icon: Gift },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Points & Rewards</h1>
          <p className="text-gray-500">Track your achievements and unlock rewards</p>
        </div>
      </div>

      {/* Points Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-accent-primary/20 via-purple-500/20 to-accent-success/20 rounded-2xl p-6 border border-accent-primary/30"
      >
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-1">
              {points.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Points</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl">{currentLevel.icon}</span>
              <span className="text-2xl font-bold">{currentLevel.level}</span>
            </div>
            <div className="text-sm text-gray-500">{currentLevel.name}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-warning mb-1">
              {earnedBadgesList.length}
            </div>
            <div className="text-sm text-gray-500">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
              <Flame className="w-8 h-8" />
              <span className="text-4xl font-bold">{streak.current}</span>
            </div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-accent-primary text-white'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-accent-primary'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Points Breakdown */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Points Breakdown</h2>
              <div className="space-y-4">
                {[
                  { label: 'Task Completion', value: pointsBreakdown.tasks, color: 'bg-accent-primary', icon: Target },
                  { label: 'Daily Habits', value: pointsBreakdown.habits, color: 'bg-purple-500', icon: CheckCircle2 },
                  { label: 'Content Published', value: pointsBreakdown.content, color: 'bg-pink-500', icon: Star },
                  { label: 'Streak Bonus', value: pointsBreakdown.streakBonus, color: 'bg-orange-500', icon: Flame },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const percentage = points.total > 0 ? (item.value / points.total) * 100 : 0;

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium">+{item.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-dark-input rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Progress Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-secondary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold gradient-text">{overallProgress}%</div>
                  <div className="text-xs text-gray-500 mt-1">Overall Progress</div>
                </div>
                <div className="bg-dark-secondary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-accent-success">{completedTasks}</div>
                  <div className="text-xs text-gray-500 mt-1">Tasks Completed</div>
                </div>
                <div className="bg-dark-secondary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-accent-warning">{streak.longest}</div>
                  <div className="text-xs text-gray-500 mt-1">Longest Streak</div>
                </div>
                <div className="bg-dark-secondary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">{totalTasks - completedTasks}</div>
                  <div className="text-xs text-gray-500 mt-1">Tasks Remaining</div>
                </div>
              </div>

              {/* Points to Next Level */}
              {currentLevel.nextLevel && (
                <div className="mt-4 p-4 bg-gradient-to-r from-accent-primary/20 to-purple-500/20 rounded-xl border border-accent-primary/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Progress to {currentLevel.nextLevel.name}</span>
                    <span className="text-sm font-medium">{currentLevel.nextLevel.minPoints - points.total} pts needed</span>
                  </div>
                  <div className="h-3 bg-dark-input rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-primary to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((points.total - currentLevel.minPoints) / (currentLevel.nextLevel.minPoints - currentLevel.minPoints)) * 100}%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'levels' && (
          <motion.div
            key="levels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-lg font-semibold mb-6">Level Progression</h2>
            <div className="space-y-4">
              {GROWTH_PLAN.levels.map((level, index) => {
                const isCurrentLevel = level.level === currentLevel.level;
                const isUnlocked = points.total >= level.minPoints;
                const nextLevel = GROWTH_PLAN.levels[index + 1];
                const progress = isCurrentLevel && nextLevel
                  ? ((points.total - level.minPoints) / (nextLevel.minPoints - level.minPoints)) * 100
                  : isUnlocked ? 100 : 0;

                return (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-4 rounded-xl border transition-all
                      ${isCurrentLevel
                        ? 'bg-gradient-to-r from-accent-primary/20 to-purple-500/20 border-accent-primary/50'
                        : isUnlocked
                          ? 'bg-dark-secondary border-accent-success/30'
                          : 'bg-dark-card border-dark-border opacity-60'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${!isUnlocked ? 'grayscale' : ''}`}>
                        {level.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{level.name}</h3>
                          <span className="text-xs text-gray-500">Level {level.level}</span>
                          {isCurrentLevel && (
                            <span className="badge bg-accent-primary/20 text-accent-primary">Current</span>
                          )}
                          {isUnlocked && !isCurrentLevel && (
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Reach {level.minPoints.toLocaleString()} points</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-dark-input rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${isUnlocked ? 'bg-accent-success' : 'bg-gray-600'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {level.minPoints.toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                    {isCurrentLevel && (
                      <div className="absolute -top-2 -right-2">
                        <Crown className="w-6 h-6 text-accent-warning" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'badges' && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Earned Badges */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent-warning" />
                Earned Badges ({earnedBadgesList.length}/{GROWTH_PLAN.badges.length})
              </h2>
              {earnedBadgesList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {earnedBadgesList.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-accent-warning/20 to-orange-500/20 rounded-xl p-4 text-center border border-accent-warning/30"
                    >
                      <span className="text-4xl block mb-2">{badge.icon}</span>
                      <h3 className="font-medium text-sm">{badge.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-2">🏆</span>
                  <p className="text-gray-500">Complete tasks to earn your first badge!</p>
                </div>
              )}
            </div>

            {/* Locked Badges */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-500" />
                Locked Badges ({lockedBadges.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-dark-secondary rounded-xl p-4 text-center border border-dark-border opacity-60"
                  >
                    <div className="relative inline-block mb-2">
                      <span className="text-4xl grayscale block">{badge.icon}</span>
                      <Lock className="w-4 h-4 text-gray-500 absolute -bottom-1 -right-1" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-400">{badge.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-lg font-semibold mb-6">Rewards & Milestones</h2>
            <div className="space-y-4">
              {[
                { points: 500, reward: 'Coffee Break', icon: '☕', description: 'Treat yourself to a nice coffee' },
                { points: 1000, reward: 'Movie Night', icon: '🎬', description: 'Take an evening off for entertainment' },
                { points: 2000, reward: 'Fancy Dinner', icon: '🍽️', description: 'Celebrate with a nice meal' },
                { points: 3500, reward: 'Tech Upgrade', icon: '💻', description: 'Invest in your workspace' },
                { points: 5000, reward: 'Weekend Getaway', icon: '✈️', description: 'Short trip to recharge' },
                { points: 7500, reward: 'New Course', icon: '📚', description: 'Invest in learning something new' },
                { points: 10000, reward: 'Major Celebration', icon: '🎉', description: 'You hit $10K MRR goal!' },
              ].map((milestone, index) => {
                const isUnlocked = points.total >= milestone.points;
                const progress = Math.min(100, (points.total / milestone.points) * 100);

                return (
                  <motion.div
                    key={milestone.points}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all
                      ${isUnlocked
                        ? 'bg-gradient-to-r from-accent-success/20 to-emerald-500/20 border-accent-success/30'
                        : 'bg-dark-secondary border-dark-border'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{milestone.reward}</h3>
                          {isUnlocked && (
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{milestone.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-2 bg-dark-input rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${isUnlocked ? 'bg-accent-success' : 'bg-accent-primary'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {points.total.toLocaleString()} / {milestone.points.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
