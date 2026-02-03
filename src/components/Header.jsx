import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Bell,
  Download,
  Focus,
  Sun,
  Moon,
  Search,
  Command
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';

export default function Header({ onMenuClick }) {
  const {
    getCurrentWeek,
    getCurrentPhase,
    toggleFocusMode,
    exportData,
    points
  } = useStore();

  const [showSearch, setShowSearch] = useState(false);
  const [quote, setQuote] = useState(GROWTH_PLAN.quotes[0]);
  const [time, setTime] = useState(new Date());

  const currentWeek = getCurrentWeek();
  const currentPhase = getCurrentPhase();
  const phase = GROWTH_PLAN.phases[currentPhase - 1];

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GROWTH_PLAN.quotes.length);
      setQuote(GROWTH_PLAN.quotes[randomIndex]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skynetjoe-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-dark-secondary/80 backdrop-blur-xl border-b border-dark-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">
              {getGreeting()}, {GROWTH_PLAN.meta.owner.split(' ')[0]}! 👋
            </h2>
            <p className="text-sm text-gray-500 max-w-md truncate">
              "{quote.text}"
            </p>
          </div>
        </div>

        {/* Center Section - Phase Info */}
        <div className="hidden lg:flex items-center gap-6">
          <motion.div
            className="flex items-center gap-3 bg-dark-card px-4 py-2 rounded-xl border border-dark-border"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl">{phase?.icon}</span>
            <div>
              <p className="text-xs text-gray-500">Phase {currentPhase}</p>
              <p className="text-sm font-medium">{phase?.shortName}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 bg-dark-card px-4 py-2 rounded-xl border border-dark-border"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-xs text-gray-500">Week {currentWeek}</p>
              <p className="text-sm font-medium">of 24</p>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <motion.button
            onClick={() => setShowSearch(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:flex items-center gap-2 text-gray-400 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 bg-dark-input rounded text-xs">⌘K</kbd>
          </motion.button>

          {/* Focus Mode */}
          <motion.button
            onClick={toggleFocusMode}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-tooltip="Focus Mode"
          >
            <Focus className="w-5 h-5" />
          </motion.button>

          {/* Export */}
          <motion.button
            onClick={handleExport}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-tooltip="Export Data"
          >
            <Download className="w-5 h-5" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-danger rounded-full" />
          </motion.button>

          {/* Points Badge */}
          <motion.div
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-accent-warning/20 to-orange-500/20 px-3 py-1.5 rounded-full border border-accent-warning/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm">⭐</span>
            <span className="text-sm font-semibold text-accent-warning">
              {points.total.toLocaleString()}
            </span>
          </motion.div>

          {/* Profile */}
          <motion.div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-primary to-purple-600 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-bold">WN</span>
          </motion.div>
        </div>
      </div>

      {/* Mobile Phase Info */}
      <div className="flex lg:hidden items-center justify-center gap-4 px-4 pb-3">
        <div className="flex items-center gap-2 text-sm">
          <span>{phase?.icon}</span>
          <span className="text-gray-400">Phase {currentPhase}</span>
        </div>
        <div className="w-px h-4 bg-dark-border" />
        <div className="flex items-center gap-2 text-sm">
          <span>📅</span>
          <span className="text-gray-400">Week {currentWeek}/24</span>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search tasks, phases, weeks..."
                    className="flex-1 bg-transparent outline-none text-lg"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 bg-dark-input rounded text-xs text-gray-500">ESC</kbd>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Quick Actions</p>
                  <div className="mt-2 space-y-1">
                    {['Go to Dashboard', 'View Tasks', 'Check KPIs', 'Focus Mode'].map((action, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Command className="w-4 h-4 text-gray-500" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
