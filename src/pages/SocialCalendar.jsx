import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  Check,
  Download,
  Eye,
  Clock,
  Hash,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  LayoutGrid
} from 'lucide-react';
import { useContentStore } from '../store/useContentStore';
import {
  PLATFORMS,
  CONTENT_PILLARS,
  SOCIAL_POSTS,
  WEEKLY_SCHEDULE,
  VIDEO_SCRIPTS
} from '../data/socialMediaContent';
import toast from 'react-hot-toast';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function SocialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState('month'); // month | week
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const { scheduledPosts, schedulePost, getPostsForDate } = useContentStore();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  }, [currentDate]);

  // Get day schedule based on day of week
  const getDaySchedule = (date) => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()];
    return WEEKLY_SCHEDULE[dayName];
  };

  // Get suggested content for a day
  const getSuggestedContent = (date) => {
    const schedule = getDaySchedule(date);
    if (!schedule) return [];

    const pillarPosts = [];

    // Get posts from matching pillar
    Object.entries(SOCIAL_POSTS).forEach(([platform, posts]) => {
      if (selectedPlatform !== 'all' && platform !== selectedPlatform) return;
      if (!schedule.platforms.includes(platform)) return;

      const matchingPosts = posts.filter(p => p.pillar === schedule.pillar);
      pillarPosts.push(...matchingPosts.map(p => ({ ...p, platform })));
    });

    return pillarPosts.slice(0, 3);
  };

  // Navigation
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Copy content
  const copyContent = async (content, id) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Get posts count for a date
  const getPostsCount = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    return (scheduledPosts[dateKey] || []).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <CalendarIcon className="w-7 h-7 text-accent-primary" />
            Social Media Calendar
          </h1>
          <p className="text-gray-400 mt-1">Plan and schedule your content across all platforms</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Platforms</option>
            {Object.entries(PLATFORMS).map(([key, platform]) => (
              <option key={key} value={key}>
                {platform.icon} {platform.name}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex bg-dark-input rounded-xl p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'month' ? 'bg-accent-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'week' ? 'bg-accent-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(PLATFORMS).slice(0, 4).map(([key, platform]) => (
          <motion.div
            key={key}
            className="bg-dark-card border border-dark-border rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${platform.color}20` }}
              >
                {platform.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400">{platform.name}</p>
                <p className="text-lg font-bold">
                  {SOCIAL_POSTS[key]?.length || 0} posts
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar Navigation */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {DAYS.map(day => (
            <div key={day} className="p-2 text-center text-sm text-gray-500 font-medium">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            const schedule = getDaySchedule(day.date);
            const postsCount = getPostsCount(day.date);

            return (
              <motion.button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  relative min-h-[100px] p-2 rounded-xl border transition-all text-left
                  ${!day.isCurrentMonth ? 'opacity-30' : ''}
                  ${isToday(day.date) ? 'border-accent-primary bg-accent-primary/10' : 'border-dark-border hover:border-white/30'}
                  ${isSelected(day.date) ? 'ring-2 ring-accent-primary' : ''}
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-sm font-medium ${isToday(day.date) ? 'text-accent-primary' : ''}`}>
                  {day.date.getDate()}
                </span>

                {schedule && day.isCurrentMonth && (
                  <div className="mt-1">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${CONTENT_PILLARS[schedule.pillar]?.color}20`,
                        color: CONTENT_PILLARS[schedule.pillar]?.color
                      }}
                    >
                      {schedule.theme.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Platform Icons */}
                {schedule && day.isCurrentMonth && (
                  <div className="flex gap-0.5 mt-1 flex-wrap">
                    {schedule.platforms.map(p => (
                      <span key={p} className="text-xs opacity-60">
                        {PLATFORMS[p]?.icon}
                      </span>
                    ))}
                  </div>
                )}

                {/* Posts Count Badge */}
                {postsCount > 0 && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-accent-success rounded-full flex items-center justify-center text-[10px] font-bold">
                    {postsCount}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-dark-card border border-dark-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                {getDaySchedule(selectedDate) && (
                  <p className="text-gray-400 mt-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-warning" />
                    {getDaySchedule(selectedDate).theme} - {getDaySchedule(selectedDate).contentType}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Schedule Post
              </button>
            </div>

            {/* Suggested Content */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Suggested Content for Today
              </h4>

              {getSuggestedContent(selectedDate).length > 0 ? (
                <div className="grid gap-4">
                  {getSuggestedContent(selectedDate).map((post, idx) => (
                    <motion.div
                      key={post.id || idx}
                      className="bg-dark-secondary border border-dark-border rounded-xl p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                              style={{ backgroundColor: `${PLATFORMS[post.platform]?.color}20` }}
                            >
                              {PLATFORMS[post.platform]?.icon}
                            </span>
                            <span className="text-sm font-medium">{PLATFORMS[post.platform]?.name}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${CONTENT_PILLARS[post.pillar]?.color}20`,
                                color: CONTENT_PILLARS[post.pillar]?.color
                              }}
                            >
                              {CONTENT_PILLARS[post.pillar]?.name}
                            </span>
                          </div>
                          <h5 className="font-medium mb-2">{post.title}</h5>
                          <p className="text-sm text-gray-400 line-clamp-3">
                            {post.content}
                          </p>
                          {post.hashtags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.hashtags.slice(0, 5).map((tag, i) => (
                                <span key={i} className="text-xs text-accent-info">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => copyContent(post.content, post.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Copy content"
                          >
                            {copiedId === post.id ? (
                              <Check className="w-4 h-4 text-accent-success" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              schedulePost(selectedDate, post);
                              toast.success('Post scheduled!');
                            }}
                            className="p-2 hover:bg-accent-primary/20 text-accent-primary rounded-lg transition-colors"
                            title="Schedule post"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No suggested content for this platform/pillar combination</p>
                  <p className="text-sm mt-1">Try selecting "All Platforms" or visit the Content Library</p>
                </div>
              )}
            </div>

            {/* Scheduled Posts */}
            {getPostsForDate(selectedDate).length > 0 && (
              <div className="mt-6 pt-6 border-t border-dark-border">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  Scheduled Posts ({getPostsForDate(selectedDate).length})
                </h4>
                <div className="space-y-3">
                  {getPostsForDate(selectedDate).map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="flex items-center gap-3 p-3 bg-dark-input rounded-xl"
                    >
                      <span className="text-lg">{PLATFORMS[post.platform]?.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.platform}</p>
                      </div>
                      <span className="text-xs text-accent-success flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Scheduled
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekly Theme Legend */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-accent-primary" />
          Weekly Content Themes
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(WEEKLY_SCHEDULE).map(([day, schedule]) => (
            <div key={day} className="p-3 bg-dark-secondary rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{ backgroundColor: `${CONTENT_PILLARS[schedule.pillar]?.color}20` }}
                >
                  {CONTENT_PILLARS[schedule.pillar]?.emoji}
                </span>
                <span className="text-sm font-medium capitalize">{day}</span>
              </div>
              <p className="text-xs text-gray-400">{schedule.theme}</p>
              <div className="flex gap-1 mt-2">
                {schedule.platforms.map(p => (
                  <span key={p} className="text-xs">{PLATFORMS[p]?.icon}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
