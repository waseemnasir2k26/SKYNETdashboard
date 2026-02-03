import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  CheckCircle2,
  Zap,
  ChevronDown,
  X,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN, CATEGORY_COLORS, PRIORITY_COLORS } from '../data/growthPlan';
import toast from 'react-hot-toast';

export default function Tasks() {
  const { tasks, toggleTask, getCompletedTasksCount, getTotalTasks } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('week');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Get all tasks with week info
  const allTasks = useMemo(() => {
    return GROWTH_PLAN.weeks.flatMap(week =>
      week.tasks.map(task => ({
        ...task,
        week: week.number,
        weekTitle: week.title,
        phase: week.phase
      }))
    );
  }, []);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...allTasks];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter === 'completed') {
      result = result.filter(task => tasks[task.id]?.completed);
    } else if (statusFilter === 'pending') {
      result = result.filter(task => !tasks[task.id]?.completed);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(task => task.category === categoryFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'week':
          comparison = a.week - b.week;
          break;
        case 'points':
          comparison = b.points - a.points;
          break;
        case 'priority':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = a.week - b.week;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [allTasks, searchTerm, statusFilter, categoryFilter, priorityFilter, sortBy, sortOrder, tasks]);

  const handleTaskToggle = (task) => {
    toggleTask(task.id, task.points);
    if (!tasks[task.id]?.completed) {
      toast.success(`+${task.points} points earned!`, { icon: '⚡' });
    }
  };

  const completedCount = getCompletedTasksCount();
  const totalCount = getTotalTasks();

  const categories = ['all', 'strategy', 'marketing', 'sales', 'content', 'operations', 'delivery'];
  const priorities = ['all', 'critical', 'high', 'medium', 'low'];
  const statuses = ['all', 'pending', 'completed'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <p className="text-gray-500">
            {completedCount} of {totalCount} tasks completed ({Math.round((completedCount / totalCount) * 100)}%)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-64">
          <div className="h-3 bg-dark-input rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary to-accent-success rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-white" />
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-secondary flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Filters (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto"
            >
              <option value="week">Sort by Week</option>
              <option value="points">Sort by Points</option>
              <option value="priority">Sort by Priority</option>
              <option value="category">Sort by Category</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-secondary p-3"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-dark-border"
            >
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="input"
                >
                  <option value="all">All Priorities</option>
                  {priorities.slice(1).map(prio => (
                    <option key={prio} value={prio}>{prio}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="week">Sort by Week</option>
                  <option value="points">Sort by Points</option>
                  <option value="priority">Sort by Priority</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${categoryFilter === cat
                ? 'bg-accent-primary text-white'
                : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-accent-primary'
              }`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Results */}
      <div className="text-sm text-gray-500 mb-2">
        Showing {filteredTasks.length} of {allTasks.length} tasks
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task, index) => {
            const isCompleted = tasks[task.id]?.completed;
            const catColor = CATEGORY_COLORS[task.category];
            const prioColor = PRIORITY_COLORS[task.priority];
            const phase = GROWTH_PLAN.phases[task.phase - 1];

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.02 }}
                className={`task-item ${isCompleted ? 'opacity-60' : ''}`}
                onClick={() => handleTaskToggle(task)}
              >
                <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-1 text-accent-warning shrink-0">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{task.points}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className={`badge ${catColor.bg} ${catColor.text}`}>
                      {task.category}
                    </span>
                    <span className={`badge ${prioColor.bg} ${prioColor.text}`}>
                      {task.priority}
                    </span>
                    <span className="badge bg-dark-input text-gray-400">
                      Week {task.week}
                    </span>
                    <span className="badge bg-dark-input text-gray-400">
                      {phase?.icon} Phase {task.phase}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-500">No tasks found matching your filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoryFilter('all');
                setPriorityFilter('all');
              }}
              className="btn-secondary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
