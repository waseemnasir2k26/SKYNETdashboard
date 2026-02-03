import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  Trash2,
  RefreshCcw,
  Bell,
  Moon,
  Sun,
  Calendar,
  Target,
  Shield,
  Info,
  ExternalLink,
  Check,
  AlertTriangle,
  Database
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';
import toast from 'react-hot-toast';

export default function Settings() {
  const {
    exportData,
    importData,
    resetProgress,
    points,
    getCompletedTasksCount,
    getTotalTasks,
    getCurrentWeek,
    getCurrentMonth
  } = useStore();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate') || new Date().toISOString().split('T')[0]);
  const fileInputRef = useRef(null);

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
    toast.success('Data exported successfully!', { icon: '📦' });
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = importData(event.target.result);
        if (success) {
          toast.success('Data imported successfully!', { icon: '✅' });
        } else {
          toast.error('Invalid backup file format');
        }
      } catch (error) {
        toast.error('Failed to import data');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.success('Progress reset successfully', { icon: '🔄' });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    localStorage.setItem('startDate', e.target.value);
    toast.success('Start date updated!', { icon: '📅' });
  };

  const completedTasks = getCompletedTasksCount();
  const totalTasks = getTotalTasks();

  const settingsSections = [
    {
      title: 'Data Management',
      icon: Database,
      items: [
        {
          id: 'export',
          label: 'Export Data',
          description: 'Download your progress as a JSON backup file',
          icon: Download,
          action: handleExport,
          type: 'button'
        },
        {
          id: 'import',
          label: 'Import Data',
          description: 'Restore from a previous backup file',
          icon: Upload,
          action: () => fileInputRef.current?.click(),
          type: 'button'
        },
        {
          id: 'reset',
          label: 'Reset Progress',
          description: 'Clear all progress and start fresh',
          icon: Trash2,
          action: () => setShowResetConfirm(true),
          type: 'danger'
        }
      ]
    },
    {
      title: 'Plan Settings',
      icon: Calendar,
      items: [
        {
          id: 'startDate',
          label: 'Plan Start Date',
          description: 'When did you start the 6-month plan?',
          icon: Calendar,
          value: startDate,
          onChange: handleStartDateChange,
          type: 'date'
        }
      ]
    },
    {
      title: 'Preferences',
      icon: SettingsIcon,
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          description: 'Receive reminders for daily habits',
          icon: Bell,
          value: notifications,
          onChange: () => setNotifications(!notifications),
          type: 'toggle'
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          description: 'Toggle between light and dark theme',
          icon: darkMode ? Moon : Sun,
          value: darkMode,
          onChange: () => {
            setDarkMode(!darkMode);
            toast('Theme switching coming soon!', { icon: '🎨' });
          },
          type: 'toggle'
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your dashboard preferences and data</p>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-accent-primary/10 to-purple-500/10 border-accent-primary/30"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-accent-primary" />
          Current Progress Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-secondary/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{points.total.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Points</div>
          </div>
          <div className="bg-dark-secondary/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent-success">{completedTasks}</div>
            <div className="text-xs text-gray-500">Tasks Done</div>
          </div>
          <div className="bg-dark-secondary/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent-warning">Week {getCurrentWeek()}</div>
            <div className="text-xs text-gray-500">Current Week</div>
          </div>
          <div className="bg-dark-secondary/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">Month {getCurrentMonth()}</div>
            <div className="text-xs text-gray-500">Current Month</div>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon;
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="card"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <SectionIcon className="w-5 h-5 text-gray-400" />
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 bg-dark-secondary rounded-xl border transition-all
                      ${item.type === 'danger'
                        ? 'border-accent-danger/30 hover:border-accent-danger/50'
                        : 'border-dark-border hover:border-accent-primary/50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'danger' ? 'bg-accent-danger/20' : 'bg-dark-input'
                      }`}>
                        <ItemIcon className={`w-5 h-5 ${
                          item.type === 'danger' ? 'text-accent-danger' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>

                    {item.type === 'button' && (
                      <motion.button
                        onClick={item.action}
                        className="btn-secondary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ItemIcon className="w-4 h-4" />
                      </motion.button>
                    )}

                    {item.type === 'danger' && (
                      <motion.button
                        onClick={item.action}
                        className="px-4 py-2 bg-accent-danger/20 text-accent-danger rounded-lg hover:bg-accent-danger/30 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Reset
                      </motion.button>
                    )}

                    {item.type === 'toggle' && (
                      <motion.button
                        onClick={item.onChange}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          item.value ? 'bg-accent-primary' : 'bg-dark-input'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{ x: item.value ? 24 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    )}

                    {item.type === 'date' && (
                      <input
                        type="date"
                        value={item.value}
                        onChange={item.onChange}
                        className="input w-auto"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-400" />
          About
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-dark-secondary rounded-xl">
            <div>
              <p className="font-medium">SkynetJoe Growth Dashboard</p>
              <p className="text-sm text-gray-500">Version 2.0.0</p>
            </div>
            <span className="text-2xl">🚀</span>
          </div>

          <div className="p-4 bg-dark-secondary rounded-xl">
            <p className="font-medium mb-2">Built for {GROWTH_PLAN.meta.agencyName}</p>
            <p className="text-sm text-gray-500 mb-3">
              Track your journey to $10K MRR with this interactive growth dashboard.
              Complete tasks, build habits, and watch your business grow!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-accent-primary/20 text-accent-primary">React</span>
              <span className="badge bg-purple-500/20 text-purple-400">Framer Motion</span>
              <span className="badge bg-blue-500/20 text-blue-400">Tailwind CSS</span>
              <span className="badge bg-green-500/20 text-green-400">Zustand</span>
              <span className="badge bg-orange-500/20 text-orange-400">Recharts</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-dark-secondary rounded-xl">
            <div>
              <p className="font-medium">Owner</p>
              <p className="text-sm text-gray-500">{GROWTH_PLAN.meta.owner}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Plan Duration</p>
              <p className="text-sm text-gray-500">{GROWTH_PLAN.meta.duration}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowResetConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent-danger/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-accent-danger" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Reset All Progress?</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-dark-secondary rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-400">You will lose:</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-accent-danger">•</span>
                  {points.total.toLocaleString()} total points
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-danger">•</span>
                  {completedTasks} completed tasks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-danger">•</span>
                  All earned badges and streaks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-danger">•</span>
                  All KPI data
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-accent-danger text-white rounded-xl font-medium hover:bg-accent-danger/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset Everything
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
