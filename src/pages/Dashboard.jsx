import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Phone,
  FileText,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Circle,
  Clock
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN, CATEGORY_COLORS, PRIORITY_COLORS } from '../data/growthPlan';
import GoalPainPoint from '../components/GoalPainPoint';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const {
    getCurrentWeek,
    getCurrentPhase,
    getCurrentMonth,
    getOverallProgress,
    getPhaseProgress,
    getWeekProgress,
    getTodayHabitsProgress,
    kpis,
    tasks,
    dailyHabits,
    toggleTask,
    toggleDailyHabit,
    streak,
    points
  } = useStore();

  const currentWeek = getCurrentWeek();
  const currentPhase = getCurrentPhase();
  const currentMonth = getCurrentMonth();
  const overallProgress = getOverallProgress();
  const weekProgress = getWeekProgress(currentWeek);
  const habitsProgress = getTodayHabitsProgress();

  const weekData = GROWTH_PLAN.weeks.find(w => w.number === currentWeek);
  const phase = GROWTH_PLAN.phases[currentPhase - 1];

  const today = new Date().toISOString().split('T')[0];
  const todayHabits = dailyHabits[today] || {};

  const handleTaskToggle = (task) => {
    toggleTask(task.id, task.points);
    if (!tasks[task.id]?.completed) {
      toast.success(`+${task.points} points! Task completed`, {
        icon: '✅',
      });
    }
  };

  const handleHabitToggle = (habit) => {
    toggleDailyHabit(habit.id, habit.points);
    if (!todayHabits[habit.id]) {
      toast.success(`+${habit.points} points! Keep it up!`, {
        icon: '🔥',
      });
    }
  };

  // Stats cards data
  const statsCards = [
    {
      title: 'Monthly Revenue',
      value: `$${(kpis.mrr[currentMonth - 1] || 0).toLocaleString()}`,
      target: `Target: $${GROWTH_PLAN.kpiMetrics[0].targets[currentMonth - 1]?.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      trend: kpis.mrr[currentMonth - 1] > (kpis.mrr[currentMonth - 2] || 0) ? 'up' : 'down'
    },
    {
      title: 'Active Clients',
      value: kpis.clients[currentMonth - 1] || 0,
      target: `Target: ${GROWTH_PLAN.kpiMetrics[1].targets[currentMonth - 1]}`,
      icon: Users,
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      trend: 'up'
    },
    {
      title: 'Discovery Calls',
      value: kpis.calls[currentMonth - 1] || 0,
      target: `Target: ${GROWTH_PLAN.kpiMetrics[2].targets[currentMonth - 1]}`,
      icon: Phone,
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      trend: 'up'
    },
    {
      title: 'Posts Published',
      value: kpis.posts[currentMonth - 1] || 0,
      target: `Target: ${GROWTH_PLAN.kpiMetrics[3].targets[currentMonth - 1]}`,
      icon: FileText,
      color: 'from-orange-500/20 to-yellow-500/20',
      iconColor: 'text-orange-400',
      trend: 'up'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-r from-accent-primary/20 via-purple-500/20 to-accent-success/20 rounded-2xl p-6 border border-accent-primary/30"
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Phase {currentPhase}: {phase?.name}
              </h1>
              <p className="text-gray-400">{phase?.theme}</p>
              <p className="text-sm text-gray-500 mt-2">{phase?.mainGoal}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">{overallProgress}%</div>
                <div className="text-xs text-gray-500">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-warning">{streak.current}</div>
                <div className="text-xs text-gray-500">Day Streak 🔥</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent-success/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Goal Pain Point Widget */}
      <motion.div variants={itemVariants}>
        <GoalPainPoint />
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card hover-lift"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.title}</div>
            <div className="text-xs text-gray-600 mt-1">{stat.target}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Phase Timeline */}
      <motion.div variants={itemVariants} className="card">
        <h2 className="text-lg font-semibold mb-4">6-Month Journey</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {GROWTH_PLAN.phases.map((p) => {
            const progress = getPhaseProgress(p.id);
            const isActive = p.id === currentPhase;
            const isCompleted = progress === 100;

            return (
              <motion.div
                key={p.id}
                className={`phase-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs text-gray-500">Phase {p.id}</span>
                </div>
                <p className="font-medium text-sm mb-2">{p.shortName}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-dark-input rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-success rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: p.id * 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{progress}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* This Week's Tasks */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Week {currentWeek}: {weekData?.title}</h2>
              <p className="text-sm text-gray-500">{weekProgress}% complete</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {weekData?.tasks.filter(t => tasks[t.id]?.completed).length}/{weekData?.tasks.length}
              </span>
            </div>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {weekData?.tasks.map((task) => {
              const isCompleted = tasks[task.id]?.completed;
              const catColor = CATEGORY_COLORS[task.category];
              const prioColor = PRIORITY_COLORS[task.priority];

              return (
                <motion.div
                  key={task.id}
                  className={`task-item ${isCompleted ? 'opacity-60' : ''}`}
                  onClick={() => handleTaskToggle(task)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge ${catColor.bg} ${catColor.text}`}>
                        {task.category}
                      </span>
                      <span className={`badge ${prioColor.bg} ${prioColor.text}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-accent-warning">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-semibold">{task.points}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Habits */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Today's Habits</h2>
              <p className="text-sm text-gray-500">
                {habitsProgress.completed}/{habitsProgress.total} completed
              </p>
            </div>
            {habitsProgress.completed === habitsProgress.total && (
              <span className="text-2xl">🎉</span>
            )}
          </div>

          <div className="space-y-3">
            {GROWTH_PLAN.dailyHabits.map((habit) => {
              const isCompleted = todayHabits[habit.id];

              return (
                <motion.div
                  key={habit.id}
                  className={`flex items-center gap-4 p-4 bg-dark-secondary rounded-xl cursor-pointer transition-all
                    ${isCompleted ? 'opacity-60 border border-accent-success/30' : 'border border-transparent hover:border-accent-primary/50'}`}
                  onClick={() => handleHabitToggle(habit)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-2xl">{habit.icon}</span>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {habit.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{habit.description}</p>
                  </div>
                  <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Habit Streak */}
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                <div>
                  <p className="font-semibold">{streak.current} Day Streak</p>
                  <p className="text-xs text-gray-400">Longest: {streak.longest} days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent-warning">+{streak.current * 5}</p>
                <p className="text-xs text-gray-500">bonus points</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MRR Progress */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">$10K MRR Goal Progress</h2>
            <p className="text-sm text-gray-500">Track your journey to $10,000 monthly recurring revenue</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold gradient-text">
              ${(kpis.mrr[currentMonth - 1] || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">of $10,000</p>
          </div>
        </div>

        <div className="h-4 bg-dark-input rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-primary via-purple-500 to-accent-success rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, ((kpis.mrr[currentMonth - 1] || 0) / 10000) * 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between mt-4">
          {[0, 2500, 5000, 7500, 10000].map((milestone) => (
            <div
              key={milestone}
              className={`text-xs ${(kpis.mrr[currentMonth - 1] || 0) >= milestone ? 'text-accent-success' : 'text-gray-500'}`}
            >
              ${milestone.toLocaleString()}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
