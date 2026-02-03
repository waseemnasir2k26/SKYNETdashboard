import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  CalendarDays,
  Trophy,
  Settings,
  X,
  Rocket,
  Zap,
  Target
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'weekly', label: 'Weekly', icon: Calendar },
  { id: 'kpis', label: 'KPIs', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'points', label: 'Points', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onClose }) {
  const {
    activeTab,
    setActiveTab,
    points,
    streak,
    getCurrentLevel,
    getOverallProgress
  } = useStore();

  const currentLevel = getCurrentLevel();
  const overallProgress = getOverallProgress();

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-[280px] h-full bg-dark-secondary border-r border-dark-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-purple-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg">SkynetJoe</h1>
              <p className="text-xs text-gray-500">Growth Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-dark-border">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="bg-dark-card rounded-xl p-3 border border-dark-border"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-accent-warning" />
              <span className="text-xs text-gray-500">Points</span>
            </div>
            <p className="text-lg font-bold">{points.total.toLocaleString()}</p>
          </motion.div>
          <motion.div
            className="bg-dark-card rounded-xl p-3 border border-dark-border"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs text-gray-500">Streak</span>
            </div>
            <p className="text-lg font-bold">{streak.current} days</p>
          </motion.div>
        </div>

        {/* Level Progress */}
        <div className="mt-3 bg-dark-card rounded-xl p-3 border border-dark-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentLevel.icon}</span>
              <span className="text-sm font-medium">{currentLevel.name}</span>
            </div>
            <span className="text-xs text-gray-500">Lv.{currentLevel.level}</span>
          </div>
          <div className="h-2 bg-dark-input rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: currentLevel.nextLevel
                  ? `${((points.total - currentLevel.minPoints) / (currentLevel.nextLevel.minPoints - currentLevel.minPoints)) * 100}%`
                  : '100%'
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          {currentLevel.nextLevel && (
            <p className="text-xs text-gray-500 mt-1 text-right">
              {currentLevel.nextLevel.minPoints - points.total} to {currentLevel.nextLevel.name}
            </p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full nav-item ${isActive ? 'active' : ''}`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === 'tasks' && (
                <span className="ml-auto text-xs bg-accent-primary/20 text-accent-primary px-2 py-0.5 rounded-full">
                  {overallProgress}%
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Goal Progress */}
      <div className="p-4 border-t border-dark-border">
        <div className="bg-gradient-to-br from-accent-primary/20 to-purple-600/20 rounded-xl p-4 border border-accent-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent-primary" />
            <span className="text-sm font-medium">$10K MRR Goal</span>
          </div>
          <div className="h-2 bg-dark-input rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (useStore.getState().kpis.mrr[useStore.getState().getCurrentMonth() - 1] / 10000) * 100)}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <p className="text-xs text-gray-400">
            ${useStore.getState().kpis.mrr[useStore.getState().getCurrentMonth() - 1]?.toLocaleString() || 0} / $10,000
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-border">
        <p className="text-xs text-gray-500 text-center">
          Built for {GROWTH_PLAN.meta.agencyName}
        </p>
      </div>
    </aside>
  );
}
