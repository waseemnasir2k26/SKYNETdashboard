import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Zap,
  Target,
  Clock,
  FileText,
  Video,
  Mic,
  Mail,
  BookOpen
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN, CATEGORY_COLORS, PRIORITY_COLORS } from '../data/growthPlan';
import toast from 'react-hot-toast';

const contentIcons = {
  blog: BookOpen,
  video: Video,
  carousel: FileText,
  reel: Video,
  newsletter: Mail,
  podcast: Mic
};

export default function Weekly() {
  const {
    getCurrentWeek,
    getWeekProgress,
    tasks,
    weeklyContent,
    toggleTask,
    toggleWeeklyContent
  } = useStore();

  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  const weekData = GROWTH_PLAN.weeks.find(w => w.number === selectedWeek);
  const phase = GROWTH_PLAN.phases[weekData?.phase - 1];
  const weekProgress = getWeekProgress(selectedWeek);

  const handleTaskToggle = (task) => {
    toggleTask(task.id, task.points);
    if (!tasks[task.id]?.completed) {
      toast.success(`+${task.points} points earned!`, { icon: '⚡' });
    }
  };

  const handleContentToggle = (content) => {
    toggleWeeklyContent(content.id, content.points, selectedWeek);
    const contentKey = `${selectedWeek}-${content.id}`;
    if (!weeklyContent[contentKey]) {
      toast.success(`+${content.points} points! Content published!`, { icon: '📝' });
    }
  };

  const completedTasks = weekData?.tasks.filter(t => tasks[t.id]?.completed).length || 0;
  const totalTasks = weekData?.tasks.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Week Selector */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
            disabled={selectedWeek === 1}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">{phase?.icon}</span>
              <span className="text-sm text-gray-500">Phase {weekData?.phase}</span>
            </div>
            <h1 className="text-2xl font-bold">Week {selectedWeek}</h1>
            <p className="text-gray-500">{weekData?.title}</p>
          </div>

          <motion.button
            onClick={() => setSelectedWeek(Math.min(24, selectedWeek + 1))}
            disabled={selectedWeek === 24}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Week Progress */}
        <div className="bg-dark-secondary rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Week Progress</span>
            <span className="text-sm font-medium">{weekProgress}%</span>
          </div>
          <div className="h-3 bg-dark-input rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${weekProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-500">{completedTasks} of {totalTasks} tasks</span>
            <span className="text-accent-warning font-medium">
              +{weekData?.tasks.reduce((sum, t) => sum + (tasks[t.id]?.completed ? t.points : 0), 0)} pts earned
            </span>
          </div>
        </div>

        {/* Week Navigation Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {GROWTH_PLAN.weeks.map((week) => {
            const progress = getWeekProgress(week.number);
            const isCurrent = week.number === selectedWeek;
            const isCompleted = progress === 100;

            return (
              <motion.button
                key={week.number}
                onClick={() => setSelectedWeek(week.number)}
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all
                  ${isCurrent
                    ? 'bg-accent-primary text-white'
                    : isCompleted
                      ? 'bg-accent-success/20 text-accent-success border border-accent-success/30'
                      : 'bg-dark-input text-gray-400 hover:text-white hover:bg-dark-border'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {week.number}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Week Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-primary" />
              Week Tasks
            </h2>
            <span className="text-sm text-gray-500">
              {completedTasks}/{totalTasks}
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence>
              {weekData?.tasks.map((task, index) => {
                const isCompleted = tasks[task.id]?.completed;
                const catColor = CATEGORY_COLORS[task.category];
                const prioColor = PRIORITY_COLORS[task.priority];

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`task-item ${isCompleted ? 'opacity-60' : ''}`}
                    onClick={() => handleTaskToggle(task)}
                  >
                    <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                      {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`badge ${catColor.bg} ${catColor.text}`}>
                          {task.category}
                        </span>
                        <span className={`badge ${prioColor.bg} ${prioColor.text}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-accent-warning shrink-0">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{task.points}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Content Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Content Schedule
            </h2>
          </div>

          <div className="space-y-3">
            {GROWTH_PLAN.weeklyContentTasks.map((content, index) => {
              const contentKey = `${selectedWeek}-${content.id}`;
              const isCompleted = weeklyContent[contentKey];
              const Icon = contentIcons[content.type] || FileText;

              return (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 bg-dark-secondary rounded-xl cursor-pointer transition-all
                    ${isCompleted
                      ? 'opacity-60 border border-accent-success/30'
                      : 'border border-transparent hover:border-purple-500/50'
                    }`}
                  onClick={() => handleContentToggle(content)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`p-3 rounded-xl ${isCompleted ? 'bg-accent-success/20' : 'bg-purple-500/20'}`}>
                    <Icon className={`w-5 h-5 ${isCompleted ? 'text-accent-success' : 'text-purple-400'}`} />
                  </div>

                  <div className="flex-1">
                    <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {content.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 capitalize">{content.type}</span>
                      <span className="text-xs text-gray-600">|</span>
                      <span className="text-xs text-gray-500">{content.frequency}</span>
                    </div>
                  </div>

                  <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="flex items-center gap-1 text-accent-warning">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">{content.points}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Content Tips */}
          <div className="mt-4 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <h3 className="font-medium text-sm mb-2">Content Tips for Week {selectedWeek}</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>Focus on {phase?.shortName.toLowerCase()} themed content</li>
              <li>Share wins and lessons learned</li>
              <li>Document your journey for authenticity</li>
              <li>Engage with comments within 1 hour</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Week Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-4">Week {selectedWeek} Focus Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['strategy', 'marketing', 'sales', 'content'].map((category) => {
            const categoryTasks = weekData?.tasks.filter(t => t.category === category) || [];
            const completed = categoryTasks.filter(t => tasks[t.id]?.completed).length;
            const catColor = CATEGORY_COLORS[category];

            return (
              <div key={category} className="bg-dark-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`badge ${catColor.bg} ${catColor.text}`}>{category}</span>
                  <span className="text-xs text-gray-500">{completed}/{categoryTasks.length}</span>
                </div>
                <div className="h-2 bg-dark-input rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${catColor.bg.replace('/20', '')}`}
                    initial={{ width: 0 }}
                    animate={{ width: categoryTasks.length > 0 ? `${(completed / categoryTasks.length) * 100}%` : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
