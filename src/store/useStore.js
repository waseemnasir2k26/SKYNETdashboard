import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GROWTH_PLAN } from '../data/growthPlan';

const initialState = {
  settings: {
    startDate: new Date().toISOString().split('T')[0],
    theme: 'dark',
    soundEnabled: true,
    notificationsEnabled: true
  },
  tasks: {},
  dailyHabits: {},
  weeklyContent: {},
  kpis: {
    mrr: [0, 0, 0, 0, 0, 0],
    clients: [0, 0, 0, 0, 0, 0],
    calls: [0, 0, 0, 0, 0, 0],
    posts: [0, 0, 0, 0, 0, 0],
    caseStudies: [0, 0, 0, 0, 0, 0],
    closeRate: [0, 0, 0, 0, 0, 0]
  },
  points: {
    total: 0,
    today: 0,
    history: []
  },
  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: null
  },
  earnedBadges: [],
  completedChallenges: [],
  notes: {},
  focusMode: false,
  selectedWeek: 1,
  activeTab: 'dashboard'
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Settings
      setStartDate: (date) => set((state) => ({
        settings: { ...state.settings, startDate: date }
      })),

      toggleSound: () => set((state) => ({
        settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled }
      })),

      toggleNotifications: () => set((state) => ({
        settings: { ...state.settings, notificationsEnabled: !state.settings.notificationsEnabled }
      })),

      // Navigation
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSelectedWeek: (week) => set({ selectedWeek: week }),
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),

      // Task Management
      toggleTask: (taskId, points) => {
        const state = get();
        const isCompleted = state.tasks[taskId]?.completed;

        if (!isCompleted) {
          set((state) => ({
            tasks: {
              ...state.tasks,
              [taskId]: { completed: true, completedDate: new Date().toISOString() }
            }
          }));
          get().addPoints(points, `Completed task: ${taskId}`);
          get().updateStreak();
          get().checkBadges();
        } else {
          set((state) => ({
            tasks: {
              ...state.tasks,
              [taskId]: { completed: false, completedDate: null }
            },
            points: {
              ...state.points,
              total: state.points.total - points
            }
          }));
        }
      },

      // Daily Habits
      toggleDailyHabit: (habitId, points) => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const todayHabits = state.dailyHabits[today] || {};
        const isCompleted = todayHabits[habitId];

        if (!isCompleted) {
          set((state) => ({
            dailyHabits: {
              ...state.dailyHabits,
              [today]: { ...todayHabits, [habitId]: true }
            }
          }));
          get().addPoints(points, `Habit: ${habitId}`);
          get().updateStreak();
        } else {
          set((state) => ({
            dailyHabits: {
              ...state.dailyHabits,
              [today]: { ...todayHabits, [habitId]: false }
            },
            points: {
              ...state.points,
              total: state.points.total - points
            }
          }));
        }
      },

      // Weekly Content
      toggleWeeklyContent: (contentId, weekNumber, points) => {
        const state = get();
        const weekKey = `week_${weekNumber}`;
        const weekContent = state.weeklyContent[weekKey] || {};
        const isCompleted = weekContent[contentId];

        if (!isCompleted) {
          set((state) => ({
            weeklyContent: {
              ...state.weeklyContent,
              [weekKey]: { ...weekContent, [contentId]: true }
            }
          }));
          get().addPoints(points, `Content: ${contentId}`);
        } else {
          set((state) => ({
            weeklyContent: {
              ...state.weeklyContent,
              [weekKey]: { ...weekContent, [contentId]: false }
            },
            points: {
              ...state.points,
              total: state.points.total - points
            }
          }));
        }
      },

      // Points
      addPoints: (amount, reason) => set((state) => ({
        points: {
          total: state.points.total + amount,
          today: state.points.today + amount,
          history: [
            { amount, reason, date: new Date().toISOString() },
            ...state.points.history.slice(0, 99)
          ]
        }
      })),

      // Streak
      updateStreak: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const lastActive = state.streak.lastActiveDate;

        if (!lastActive) {
          set({ streak: { current: 1, longest: 1, lastActiveDate: today } });
        } else if (lastActive !== today) {
          const lastDate = new Date(lastActive);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            const newStreak = state.streak.current + 1;
            set({
              streak: {
                current: newStreak,
                longest: Math.max(newStreak, state.streak.longest),
                lastActiveDate: today
              }
            });

            // Bonus points for streaks
            if (newStreak === 7) get().addPoints(50, '7-day streak bonus!');
            if (newStreak === 14) get().addPoints(100, '14-day streak bonus!');
            if (newStreak === 30) get().addPoints(200, '30-day streak bonus!');
          } else if (diffDays > 1) {
            set({ streak: { current: 1, longest: state.streak.longest, lastActiveDate: today } });
          }
        }
      },

      // KPIs
      updateKPI: (kpiId, monthIndex, value) => set((state) => ({
        kpis: {
          ...state.kpis,
          [kpiId]: state.kpis[kpiId].map((v, i) => i === monthIndex ? parseFloat(value) || 0 : v)
        }
      })),

      // Notes
      addNote: (taskId, note) => set((state) => ({
        notes: { ...state.notes, [taskId]: note }
      })),

      // Badges
      earnBadge: (badgeId) => set((state) => ({
        earnedBadges: [...state.earnedBadges, badgeId]
      })),

      checkBadges: () => {
        const state = get();
        const { tasks, kpis, streak, earnedBadges } = state;

        GROWTH_PLAN.badges.forEach(badge => {
          if (earnedBadges.includes(badge.id)) return;

          let earned = false;

          switch (badge.condition) {
            case 'week1Complete':
              earned = get().getWeekProgress(1) === 100;
              break;
            case 'phase1Complete':
              earned = get().getPhaseProgress(1) === 100;
              break;
            case 'phase3Complete':
              earned = get().getPhaseProgress(3) === 100;
              break;
            case 'posts10':
              earned = kpis.posts.reduce((a, b) => a + b, 0) >= 10;
              break;
            case 'posts50':
              earned = kpis.posts.reduce((a, b) => a + b, 0) >= 50;
              break;
            case 'firstClient':
              earned = kpis.clients.some(c => c > 0);
              break;
            case 'clients10':
              earned = kpis.clients.some(c => c >= 10);
              break;
            case 'streak7':
              earned = streak.current >= 7 || streak.longest >= 7;
              break;
            case 'streak14':
              earned = streak.current >= 14 || streak.longest >= 14;
              break;
            case 'streak30':
              earned = streak.current >= 30 || streak.longest >= 30;
              break;
            case 'mrr5k':
              earned = kpis.mrr.some(m => m >= 5000);
              break;
            case 'mrr10k':
              earned = kpis.mrr.some(m => m >= 10000);
              break;
          }

          if (earned) {
            get().earnBadge(badge.id);
            get().addPoints(100, `Badge earned: ${badge.name}`);
          }
        });
      },

      // Complete Challenge
      completeChallenge: (challengeId, points) => {
        const state = get();
        if (state.completedChallenges.includes(challengeId)) return;

        set((state) => ({
          completedChallenges: [...state.completedChallenges, challengeId]
        }));
        get().addPoints(points, `Challenge: ${challengeId}`);
      },

      // Calculations
      getCurrentWeek: () => {
        const state = get();
        const start = new Date(state.settings.startDate);
        const now = new Date();
        const diffTime = now - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const week = Math.floor(diffDays / 7) + 1;
        return Math.max(1, Math.min(24, week));
      },

      getCurrentPhase: () => {
        const week = get().getCurrentWeek();
        return Math.ceil(week / 4);
      },

      getCurrentMonth: () => {
        return get().getCurrentPhase();
      },

      getWeekProgress: (weekNumber) => {
        const state = get();
        const weekData = GROWTH_PLAN.weeks.find(w => w.number === weekNumber);
        if (!weekData) return 0;
        const completedCount = weekData.tasks.filter(t => state.tasks[t.id]?.completed).length;
        return Math.round((completedCount / weekData.tasks.length) * 100);
      },

      getPhaseProgress: (phaseId) => {
        const state = get();
        const phaseWeeks = GROWTH_PLAN.weeks.filter(w => w.phase === phaseId);
        const allTasks = phaseWeeks.flatMap(w => w.tasks);
        const completedCount = allTasks.filter(t => state.tasks[t.id]?.completed).length;
        return allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;
      },

      getOverallProgress: () => {
        const state = get();
        const allTasks = GROWTH_PLAN.weeks.flatMap(w => w.tasks);
        const completedCount = allTasks.filter(t => state.tasks[t.id]?.completed).length;
        return Math.round((completedCount / allTasks.length) * 100);
      },

      getTodayHabitsProgress: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const todayHabits = state.dailyHabits[today] || {};
        const completed = Object.values(todayHabits).filter(v => v).length;
        return { completed, total: GROWTH_PLAN.dailyHabits.length };
      },

      getCurrentLevel: () => {
        const points = get().points.total;
        for (let i = GROWTH_PLAN.levels.length - 1; i >= 0; i--) {
          if (points >= GROWTH_PLAN.levels[i].minPoints) {
            return {
              ...GROWTH_PLAN.levels[i],
              nextLevel: GROWTH_PLAN.levels[i + 1] || null
            };
          }
        }
        return { ...GROWTH_PLAN.levels[0], nextLevel: GROWTH_PLAN.levels[1] };
      },

      getTasksByCategory: (category) => {
        const state = get();
        const allTasks = GROWTH_PLAN.weeks.flatMap(w => w.tasks.map(t => ({ ...t, week: w.number })));
        return category === 'all' ? allTasks : allTasks.filter(t => t.category === category);
      },

      getCompletedTasksCount: () => {
        const state = get();
        return Object.values(state.tasks).filter(t => t?.completed).length;
      },

      getTotalTasks: () => {
        return GROWTH_PLAN.weeks.flatMap(w => w.tasks).length;
      },

      // Reset
      resetProgress: () => set({
        tasks: {},
        dailyHabits: {},
        weeklyContent: {},
        points: { total: 0, today: 0, history: [] },
        streak: { current: 0, longest: 0, lastActiveDate: null },
        earnedBadges: [],
        completedChallenges: [],
        notes: {}
      }),

      // Export/Import
      exportData: () => {
        const state = get();
        return JSON.stringify({
          settings: state.settings,
          tasks: state.tasks,
          dailyHabits: state.dailyHabits,
          weeklyContent: state.weeklyContent,
          kpis: state.kpis,
          points: state.points,
          streak: state.streak,
          earnedBadges: state.earnedBadges,
          completedChallenges: state.completedChallenges,
          notes: state.notes
        }, null, 2);
      },

      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set({
            settings: data.settings || initialState.settings,
            tasks: data.tasks || {},
            dailyHabits: data.dailyHabits || {},
            weeklyContent: data.weeklyContent || {},
            kpis: data.kpis || initialState.kpis,
            points: data.points || initialState.points,
            streak: data.streak || initialState.streak,
            earnedBadges: data.earnedBadges || [],
            completedChallenges: data.completedChallenges || [],
            notes: data.notes || {}
          });
          return true;
        } catch (e) {
          console.error('Import failed:', e);
          return false;
        }
      }
    }),
    {
      name: 'skynetjoe-dashboard-storage',
      version: 1
    }
  )
);
