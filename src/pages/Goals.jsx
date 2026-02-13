import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Calendar,
  Zap,
  Trophy,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Flame,
  Clock,
  BarChart3,
  AlertCircle,
  Save
} from 'lucide-react';
import { useGoalsStore, GOAL_UNITS } from '../store/useGoalsStore';
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

// Goal Card Component
const GoalCard = ({ goal, onEdit, onDelete, onUpdateProgress, type, quarter }) => {
  const { calculateBreakdown } = useGoalsStore();
  const breakdown = calculateBreakdown(goal);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newProgress, setNewProgress] = useState(goal.current);

  // Sync newProgress when goal.current changes externally
  useEffect(() => {
    setNewProgress(goal.current);
  }, [goal.current]);

  const getTypeLabel = () => {
    switch (type) {
      case 'yearly': return 'Yearly Goal';
      case 'quarterly': return `${quarter} Goal`;
      case 'ninetyDay': return '90-Day Focus';
      case 'thirtyDay': return '30-Day Sprint';
      default: return 'Goal';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'yearly': return 'from-purple-500/20 to-indigo-500/20 border-purple-500/30';
      case 'quarterly': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'ninetyDay': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30';
      case 'thirtyDay': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const handleProgressUpdate = () => {
    onUpdateProgress(type, parseInt(newProgress) || 0, quarter);
    toast.success('Progress updated!');
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      className={`bg-gradient-to-br ${getTypeColor()} rounded-2xl border overflow-hidden`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">{getTypeLabel()}</span>
              <h3 className="text-lg font-bold text-white">{goal.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              breakdown.onTrack ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {breakdown.onTrack ? 'On Track' : 'Behind'}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium text-white">
              {goal.current} / {goal.target} {goal.unit}
            </span>
          </div>
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, breakdown.percentComplete)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{breakdown.daysRemaining} days left</span>
            <span className="text-xs font-medium text-accent-primary">{breakdown.percentComplete}%</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">{breakdown.dailyTarget}</p>
            <p className="text-xs text-gray-500">per day</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">{breakdown.weeklyTarget}</p>
            <p className="text-xs text-gray-500">per week</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">{breakdown.monthlyTarget}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/10">
                {/* Description */}
                {goal.description && (
                  <p className="text-gray-400 text-sm mb-4">{goal.description}</p>
                )}

                {/* Update Progress */}
                <div className="bg-black/20 rounded-xl p-4 mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">Update Progress</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={newProgress}
                      onChange={(e) => setNewProgress(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-input border border-dark-border rounded-lg text-white focus:border-accent-primary focus:outline-none"
                    />
                    <button
                      onClick={handleProgressUpdate}
                      className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/80 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Deadline
                    </span>
                    <span className="text-white">{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Created
                    </span>
                    <span className="text-white">{new Date(goal.createdAt).toLocaleDateString()}</span>
                  </div>
                  {goal.milestoneReward && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Reward
                      </span>
                      <span className="text-accent-warning">{goal.milestoneReward}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(goal, type, quarter)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-dark-input text-gray-300 hover:text-white rounded-lg border border-dark-border hover:border-accent-primary transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(type, quarter)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Add/Edit Goal Modal
const GoalModal = ({ isOpen, onClose, onSave, editingGoal, goalType, goalQuarter }) => {
  const getDefaultFormData = () => ({
    title: '',
    description: '',
    target: '',
    current: 0,
    unit: 'videos',
    deadline: goalType === 'yearly' ? '2026-12-31' :
              goalType === 'ninetyDay' ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
              goalType === 'thirtyDay' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
              new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    milestoneReward: ''
  });

  const [formData, setFormData] = useState(editingGoal || getDefaultFormData());

  // Reset form data when editingGoal changes
  useEffect(() => {
    if (editingGoal) {
      setFormData(editingGoal);
    } else {
      setFormData(getDefaultFormData());
    }
  }, [editingGoal, goalType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) {
      toast.error('Please fill in title and target');
      return;
    }
    onSave(formData, goalType, goalQuarter);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-dark-secondary rounded-2xl border border-dark-border overflow-hidden"
      >
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {editingGoal ? 'Edit Goal' : 'Add New Goal'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Goal Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 500 Videos, $10K MRR"
              className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What's this goal about?"
              rows={2}
              className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Target</label>
              <input
                type="number"
                min="0"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || '' })}
                placeholder="500"
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white"
              >
                {GOAL_UNITS.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.icon} {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Current Progress</label>
              <input
                type="number"
                min="0"
                value={formData.current}
                onChange={(e) => setFormData({ ...formData, current: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Milestone Reward</label>
            <input
              type="text"
              value={formData.milestoneReward}
              onChange={(e) => setFormData({ ...formData, milestoneReward: e.target.value })}
              placeholder="e.g., Trip to Bangkok"
              className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary text-white"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-dark-input text-gray-300 rounded-xl hover:bg-dark-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-primary to-purple-600 text-white font-medium rounded-xl"
            >
              <Check className="w-5 h-5" />
              {editingGoal ? 'Save Changes' : 'Add Goal'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function Goals() {
  const {
    goals,
    setGoal,
    updateProgress,
    deleteGoal,
    getAllGoals,
    calculateBreakdown
  } = useGoalsStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('yearly');
  const [modalQuarter, setModalQuarter] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  const allGoals = getAllGoals();
  const totalProgress = allGoals.length > 0
    ? Math.round(allGoals.reduce((sum, g) => sum + (g.percentComplete || 0), 0) / allGoals.length)
    : 0;

  const handleOpenModal = (type, quarter = null) => {
    setModalType(type);
    setModalQuarter(quarter);
    setEditingGoal(null);
    setModalOpen(true);
  };

  const handleEditGoal = (goal, type, quarter) => {
    setModalType(type);
    setModalQuarter(quarter);
    setEditingGoal(goal);
    setModalOpen(true);
  };

  const handleSaveGoal = (formData, type, quarter) => {
    setGoal(type, formData, quarter);
    toast.success(editingGoal ? 'Goal updated!' : 'Goal added!');
  };

  const handleDeleteGoal = (type, quarter) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(type, quarter);
      toast.success('Goal deleted');
    }
  };

  const handleUpdateProgress = (type, newCurrent, quarter) => {
    updateProgress(type, newCurrent, quarter);
  };

  // Goal type sections
  const sections = [
    { type: 'yearly', title: 'Yearly Goal', goal: goals.yearly, color: 'from-purple-500 to-indigo-600', emptyBg: 'from-purple-500/10 to-indigo-600/10' },
    { type: 'ninetyDay', title: '90-Day Focus', goal: goals.ninetyDay, color: 'from-orange-500 to-amber-600', emptyBg: 'from-orange-500/10 to-amber-600/10' },
    { type: 'thirtyDay', title: '30-Day Sprint', goal: goals.thirtyDay, color: 'from-green-500 to-emerald-600', emptyBg: 'from-green-500/10 to-emerald-600/10' }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Goals</h1>
          <p className="text-gray-400">Set and track your targets</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold gradient-text">{totalProgress}%</p>
            <p className="text-sm text-gray-500">Overall Progress</p>
          </div>
        </div>
      </motion.div>

      {/* Main Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sections.map(section => (
          <motion.div key={section.type} variants={itemVariants}>
            {section.goal ? (
              <GoalCard
                goal={section.goal}
                type={section.type}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
                onUpdateProgress={handleUpdateProgress}
              />
            ) : (
              <motion.button
                onClick={() => handleOpenModal(section.type)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-48 bg-gradient-to-br ${section.emptyBg} rounded-2xl border border-dashed border-gray-600 hover:border-accent-primary flex flex-col items-center justify-center gap-3 transition-all`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center`}>
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-white">Add {section.title}</p>
                  <p className="text-sm text-gray-500">Set your target</p>
                </div>
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quarterly Goals */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Quarterly Goals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => {
            const quarterGoal = goals.quarterly[quarter];
            return (
              <div key={quarter}>
                {quarterGoal ? (
                  <GoalCard
                    goal={quarterGoal}
                    type="quarterly"
                    quarter={quarter}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                    onUpdateProgress={handleUpdateProgress}
                  />
                ) : (
                  <motion.button
                    onClick={() => handleOpenModal('quarterly', quarter)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-40 bg-dark-input rounded-xl border border-dashed border-gray-600 hover:border-blue-500 flex flex-col items-center justify-center gap-2 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Plus className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="font-medium text-gray-400">{quarter} Goal</p>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Breakdown View */}
      {allGoals.length > 0 && (
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-primary" />
            Goal Breakdown Overview
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Goal</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Progress</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Daily</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Weekly</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Monthly</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Days Left</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {allGoals.map((goal, index) => {
                  const breakdown = calculateBreakdown(goal);
                  return (
                    <tr key={goal.id || index} className="border-b border-dark-border/50 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-white">{goal.title}</p>
                          <p className="text-xs text-gray-500">{goal.type === 'quarterly' ? goal.quarter : goal.type}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 h-2 bg-dark-input rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
                              style={{ width: `${Math.min(100, breakdown.percentComplete)}%` }}
                            />
                          </div>
                          <span className="text-sm text-white">{breakdown.percentComplete}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-white font-medium">{breakdown.dailyTarget}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{breakdown.weeklyTarget}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{breakdown.monthlyTarget}</td>
                      <td className="py-3 px-4 text-center text-gray-400">{breakdown.daysRemaining}</td>
                      <td className="py-3 px-4 text-center">
                        {breakdown.onTrack ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            On Track
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            Behind
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Goal Modal */}
      <GoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
        goalType={modalType}
        goalQuarter={modalQuarter}
      />
    </motion.div>
  );
}
