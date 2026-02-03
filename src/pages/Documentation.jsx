import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Target,
  Calendar,
  CheckSquare,
  TrendingUp,
  Trophy,
  Flame,
  Zap,
  ChevronDown,
  ChevronRight,
  Rocket,
  Users,
  BarChart3,
  Clock,
  Star,
  Award,
  ExternalLink
} from 'lucide-react';
import { GROWTH_PLAN } from '../data/growthPlan';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'phases', label: '6 Phases', icon: Target },
    { id: 'tasks', label: 'Task System', icon: CheckSquare },
    { id: 'habits', label: 'Daily Habits', icon: Calendar },
    { id: 'kpis', label: 'KPI Tracking', icon: TrendingUp },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'faq', label: 'FAQ', icon: Star }
  ];

  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    {
      id: 1,
      question: 'How does the points system work?',
      answer: 'You earn points by completing tasks, daily habits, and weekly content. Points contribute to your level progression and unlock badges. Streaks also give bonus points at 7, 14, and 30 days.'
    },
    {
      id: 2,
      question: 'Can I change my start date?',
      answer: 'Yes! Go to Settings and update your Plan Start Date. This will recalculate which week and phase you should be on based on the new date.'
    },
    {
      id: 3,
      question: 'What happens if I miss a day?',
      answer: 'Missing a day will reset your current streak, but your longest streak record is preserved. You can always pick back up where you left off - consistency over time is what matters most.'
    },
    {
      id: 4,
      question: 'How are KPIs tracked?',
      answer: 'KPIs are tracked monthly across 6 metrics: MRR, Clients, Sales Calls, Content Posts, Case Studies, and Close Rate. Update them in the KPIs page to see your progress visualized.'
    },
    {
      id: 5,
      question: 'Can I export my progress?',
      answer: 'Yes! In Settings, use the Export Data button to download a JSON backup of all your progress. You can import this backup later or on another device.'
    },
    {
      id: 6,
      question: 'What is Focus Mode?',
      answer: 'Focus Mode shows only today\'s priorities - current tasks, daily habits, and your streak. It helps minimize distractions and keeps you focused on what matters today.'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-accent-primary/20 to-purple-600/20 rounded-2xl p-6 border border-accent-primary/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-purple-600 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">SkynetJoe Growth Dashboard</h2>
                  <p className="text-gray-400">Your 6-Month Journey to $10K MRR</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                This interactive dashboard is designed to guide you through a comprehensive 24-week agency growth plan.
                Track your progress, build daily habits, and watch your business grow with gamified milestones and achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Clock, label: '24 Weeks', desc: '6-month structured plan' },
                { icon: CheckSquare, label: `${GROWTH_PLAN.weeks.flatMap(w => w.tasks).length}+ Tasks`, desc: 'Actionable weekly tasks' },
                { icon: Trophy, label: `${GROWTH_PLAN.badges.length} Badges`, desc: 'Achievement milestones' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dark-secondary rounded-xl p-4 border border-dark-border"
                >
                  <item.icon className="w-8 h-8 text-accent-primary mb-3" />
                  <p className="font-semibold text-lg">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
              <h3 className="text-lg font-semibold mb-4">How to Use This Dashboard</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span>Set your start date in Settings to begin your 6-month journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span>Complete weekly tasks by checking them off in the Tasks or Weekly page</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span>Build daily habits using the Calendar page - maintain your streak!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span>Track your KPIs monthly to visualize business growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <span>Earn points, level up, and unlock badges for your achievements!</span>
                </li>
              </ol>
            </div>
          </div>
        );

      case 'phases':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">The 6 Phases of Growth</h2>
            <p className="text-gray-400">
              Your journey is divided into 6 phases, each lasting 4 weeks. Each phase builds on the previous one to create sustainable agency growth.
            </p>

            <div className="space-y-4">
              {GROWTH_PLAN.phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-secondary rounded-xl p-6 border border-dark-border hover:border-accent-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{phase.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{phase.name}</h3>
                        <span className="badge bg-accent-primary/20 text-accent-primary">
                          Weeks {(index * 4) + 1}-{(index + 1) * 4}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{phase.shortName}</p>
                    </div>
                  </div>
                  <p className="text-gray-400">{phase.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phase.milestones.map((milestone, i) => (
                      <span key={i} className="text-xs bg-dark-input px-3 py-1 rounded-full text-gray-400">
                        {milestone}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Task System</h2>
            <p className="text-gray-400">
              Tasks are your weekly action items. Each task is categorized and prioritized to help you focus on what matters most.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-primary" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {Object.entries({
                    strategy: { color: 'bg-blue-500/20 text-blue-400', desc: 'Business planning and positioning' },
                    marketing: { color: 'bg-purple-500/20 text-purple-400', desc: 'Outreach and lead generation' },
                    sales: { color: 'bg-green-500/20 text-green-400', desc: 'Client acquisition and closing' },
                    content: { color: 'bg-orange-500/20 text-orange-400', desc: 'Content creation and distribution' }
                  }).map(([cat, info]) => (
                    <div key={cat} className="flex items-center justify-between p-3 bg-dark-input rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`badge ${info.color} capitalize`}>{cat}</span>
                      </div>
                      <span className="text-xs text-gray-500">{info.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-warning" />
                  Priority Levels
                </h3>
                <div className="space-y-2">
                  {[
                    { level: 'high', color: 'bg-red-500/20 text-red-400', desc: 'Critical - do first', points: '15-25' },
                    { level: 'medium', color: 'bg-yellow-500/20 text-yellow-400', desc: 'Important - schedule time', points: '10-15' },
                    { level: 'low', color: 'bg-gray-500/20 text-gray-400', desc: 'Optional - nice to have', points: '5-10' }
                  ].map((p) => (
                    <div key={p.level} className="flex items-center justify-between p-3 bg-dark-input rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`badge ${p.color} capitalize`}>{p.level}</span>
                        <span className="text-xs text-gray-500">{p.desc}</span>
                      </div>
                      <span className="text-xs text-accent-warning">{p.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent-warning/10 to-orange-500/10 rounded-xl p-6 border border-accent-warning/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent-warning" />
                Pro Tip
              </h3>
              <p className="text-gray-300">
                Focus on high-priority tasks first, but don't ignore the weekly content schedule!
                Consistent content creation compounds over time and builds authority in your niche.
              </p>
            </div>
          </div>
        );

      case 'habits':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Daily Habits</h2>
            <p className="text-gray-400">
              Small daily actions compound into massive results. Track these habits every day to build momentum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GROWTH_PLAN.dailyHabits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-secondary rounded-xl p-4 border border-dark-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{habit.title}</p>
                      <p className="text-sm text-gray-500">{habit.description}</p>
                    </div>
                    <span className="badge bg-accent-warning/20 text-accent-warning">
                      +{habit.points}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                Streak Bonuses
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { days: 7, bonus: 50, emoji: '🔥' },
                  { days: 14, bonus: 100, emoji: '⚡' },
                  { days: 30, bonus: 200, emoji: '🏆' }
                ].map((streak) => (
                  <div key={streak.days} className="text-center p-4 bg-dark-input rounded-xl">
                    <span className="text-2xl mb-2 block">{streak.emoji}</span>
                    <p className="font-semibold">{streak.days} Days</p>
                    <p className="text-accent-warning text-sm">+{streak.bonus} bonus pts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'kpis':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">KPI Tracking</h2>
            <p className="text-gray-400">
              Key Performance Indicators help you measure what matters. Track these metrics monthly to visualize your agency's growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'mrr', name: 'Monthly Recurring Revenue', target: '$10,000', icon: '💰', desc: 'Your primary revenue goal' },
                { id: 'clients', name: 'Active Clients', target: '10+', icon: '👥', desc: 'Paying client relationships' },
                { id: 'calls', name: 'Sales Calls', target: '20/month', icon: '📞', desc: 'Discovery and pitch calls' },
                { id: 'posts', name: 'Content Posts', target: '12/month', icon: '📝', desc: 'Blog, social, and video content' },
                { id: 'caseStudies', name: 'Case Studies', target: '1/month', icon: '📊', desc: 'Client success stories' },
                { id: 'closeRate', name: 'Close Rate', target: '25%+', icon: '🎯', desc: 'Sales conversion percentage' }
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-secondary rounded-xl p-4 border border-dark-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{kpi.icon}</span>
                    <p className="font-medium">{kpi.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{kpi.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Target:</span>
                    <span className="badge bg-accent-success/20 text-accent-success">{kpi.target}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'gamification':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gamification System</h2>
            <p className="text-gray-400">
              Level up, earn badges, and track your progress with our gamified achievement system.
            </p>

            <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-primary" />
                Levels ({GROWTH_PLAN.levels.length} Total)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {GROWTH_PLAN.levels.map((level) => (
                  <div
                    key={level.level}
                    className="bg-dark-input rounded-xl p-3 text-center"
                  >
                    <span className="text-2xl mb-1 block">{level.icon}</span>
                    <p className="text-sm font-medium">{level.name}</p>
                    <p className="text-xs text-gray-500">{level.minPoints.toLocaleString()}+ pts</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-warning" />
                Badges ({GROWTH_PLAN.badges.length} Total)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {GROWTH_PLAN.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-dark-input rounded-xl p-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{badge.name}</p>
                      <p className="text-xs text-gray-500 truncate">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="bg-dark-secondary rounded-xl border border-dark-border overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-dark-input transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaqs[faq.id] ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaqs[faq.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-dark-border"
                      >
                        <p className="p-4 text-gray-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Documentation & Guide</h1>
        <p className="text-gray-500">Learn how to use the SkynetJoe Growth Dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card border border-dark-border rounded-xl p-4 sticky top-4">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive
                        ? 'bg-accent-primary/20 text-accent-primary'
                        : 'text-gray-400 hover:text-white hover:bg-dark-input'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
