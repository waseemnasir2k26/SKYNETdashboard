import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function to calculate days between dates
const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Admin pre-configured goals for Wasim
const ADMIN_GOALS = {
  yearly: {
    id: 'admin_yearly_1',
    type: 'yearly',
    title: '500 Videos to Freedom',
    description: 'Upload 500 videos, then leave Pakistan for Bangkok',
    target: 500,
    current: 5,
    unit: 'videos',
    deadline: '2026-12-31',
    milestoneReward: 'Leave Pakistan → Bangkok!',
    createdAt: new Date().toISOString()
  },
  thirtyDay: {
    id: 'admin_30day_1',
    type: 'thirtyDay',
    title: '100 Videos Sprint',
    description: '30-day video challenge - upload 100 videos',
    target: 100,
    current: 5,
    unit: 'videos',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    milestoneReward: 'First milestone completed!',
    createdAt: new Date().toISOString()
  }
};

// Common unit presets
export const GOAL_UNITS = [
  { value: 'videos', label: 'Videos', icon: '🎬' },
  { value: 'posts', label: 'Posts', icon: '📝' },
  { value: 'clients', label: 'Clients', icon: '👥' },
  { value: 'dollars', label: 'Dollars ($)', icon: '💰' },
  { value: 'calls', label: 'Calls', icon: '📞' },
  { value: 'leads', label: 'Leads', icon: '🎯' },
  { value: 'hours', label: 'Hours', icon: '⏱️' },
  { value: 'tasks', label: 'Tasks', icon: '✅' },
  { value: 'custom', label: 'Custom', icon: '✨' }
];

const initialState = {
  goals: {
    yearly: null,
    quarterly: {
      Q1: null,
      Q2: null,
      Q3: null,
      Q4: null
    },
    ninetyDay: null,
    thirtyDay: null
  },
  customGoals: [],
  onboardingComplete: false,
  onboardingStep: 0
};

export const useGoalsStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Initialize admin goals for specific email
      initializeAdminGoals: (email) => {
        const normalizedEmail = email?.toLowerCase().trim();
        if (normalizedEmail === 'waseem@skynetjoe.com') {
          set((state) => ({
            goals: {
              ...state.goals,
              yearly: ADMIN_GOALS.yearly,
              thirtyDay: ADMIN_GOALS.thirtyDay
            },
            onboardingComplete: true
          }));
          return true;
        }
        return false;
      },

      // Add or update a goal
      setGoal: (type, goal, quarter = null) => {
        const goalWithMeta = {
          ...goal,
          id: goal.id || `goal_${Date.now()}`,
          type,
          createdAt: goal.createdAt || new Date().toISOString(),
          ...get().calculateBreakdown(goal)
        };

        if (type === 'quarterly' && quarter) {
          set((state) => ({
            goals: {
              ...state.goals,
              quarterly: {
                ...state.goals.quarterly,
                [quarter]: goalWithMeta
              }
            }
          }));
        } else {
          set((state) => ({
            goals: {
              ...state.goals,
              [type]: goalWithMeta
            }
          }));
        }
      },

      // Update goal progress
      updateProgress: (type, newCurrent, quarter = null) => {
        const state = get();
        let goal;

        if (type === 'quarterly' && quarter) {
          goal = state.goals.quarterly[quarter];
        } else {
          goal = state.goals[type];
        }

        if (!goal) return;

        const updatedGoal = {
          ...goal,
          current: newCurrent,
          ...get().calculateBreakdown({ ...goal, current: newCurrent })
        };

        if (type === 'quarterly' && quarter) {
          set((state) => ({
            goals: {
              ...state.goals,
              quarterly: {
                ...state.goals.quarterly,
                [quarter]: updatedGoal
              }
            }
          }));
        } else {
          set((state) => ({
            goals: {
              ...state.goals,
              [type]: updatedGoal
            }
          }));
        }
      },

      // Increment progress by 1 (quick update)
      incrementProgress: (type, quarter = null) => {
        const state = get();
        let goal;

        if (type === 'quarterly' && quarter) {
          goal = state.goals.quarterly[quarter];
        } else {
          goal = state.goals[type];
        }

        if (goal) {
          get().updateProgress(type, goal.current + 1, quarter);
        }
      },

      // Calculate smart breakdown
      calculateBreakdown: (goal) => {
        if (!goal || !goal.deadline || !goal.target) {
          return {
            dailyTarget: 0,
            weeklyTarget: 0,
            monthlyTarget: 0,
            percentComplete: 0,
            onTrack: true,
            daysRemaining: 0,
            remaining: 0
          };
        }

        const today = new Date();
        const deadline = new Date(goal.deadline);
        const daysRemaining = Math.max(1, daysBetween(today, deadline));
        const remaining = Math.max(0, goal.target - (goal.current || 0));

        const dailyTarget = remaining / daysRemaining;
        const weeklyTarget = dailyTarget * 7;
        const monthlyTarget = dailyTarget * 30;
        const percentComplete = goal.target > 0 ? ((goal.current || 0) / goal.target) * 100 : 0;

        // Calculate if on track (should have completed X% by now)
        const totalDays = daysBetween(goal.createdAt || today, deadline);
        const daysElapsed = totalDays - daysRemaining;
        const expectedProgress = (daysElapsed / totalDays) * goal.target;
        const onTrack = (goal.current || 0) >= expectedProgress * 0.9;

        return {
          dailyTarget: Math.ceil(dailyTarget * 10) / 10,
          weeklyTarget: Math.ceil(weeklyTarget * 10) / 10,
          monthlyTarget: Math.ceil(monthlyTarget * 10) / 10,
          percentComplete: Math.min(100, Math.round(percentComplete * 10) / 10),
          onTrack,
          daysRemaining,
          remaining
        };
      },

      // Get progress for a specific goal
      getGoalProgress: (type, quarter = null) => {
        const state = get();
        let goal;

        if (type === 'quarterly' && quarter) {
          goal = state.goals.quarterly[quarter];
        } else {
          goal = state.goals[type];
        }

        if (!goal) return null;

        return {
          ...goal,
          ...get().calculateBreakdown(goal)
        };
      },

      // Get primary goal (for pain point widget)
      getPrimaryGoal: () => {
        const state = get();
        // Priority: yearly > 90-day > 30-day > quarterly
        return state.goals.yearly ||
               state.goals.ninetyDay ||
               state.goals.thirtyDay ||
               state.goals.quarterly.Q1 ||
               null;
      },

      // Get all active goals
      getAllGoals: () => {
        const state = get();
        const goals = [];

        if (state.goals.yearly) goals.push(state.goals.yearly);

        Object.keys(state.goals.quarterly).forEach(q => {
          if (state.goals.quarterly[q]) {
            goals.push({ ...state.goals.quarterly[q], quarter: q });
          }
        });

        if (state.goals.ninetyDay) goals.push(state.goals.ninetyDay);
        if (state.goals.thirtyDay) goals.push(state.goals.thirtyDay);

        return goals.map(goal => ({
          ...goal,
          ...get().calculateBreakdown(goal)
        }));
      },

      // Custom goals
      addCustomGoal: (goal) => {
        const customGoal = {
          ...goal,
          id: `custom_${Date.now()}`,
          type: 'custom',
          createdAt: new Date().toISOString(),
          ...get().calculateBreakdown(goal)
        };

        set((state) => ({
          customGoals: [...state.customGoals, customGoal]
        }));
      },

      updateCustomGoal: (goalId, updates) => {
        set((state) => ({
          customGoals: state.customGoals.map(g =>
            g.id === goalId
              ? { ...g, ...updates, ...get().calculateBreakdown({ ...g, ...updates }) }
              : g
          )
        }));
      },

      deleteCustomGoal: (goalId) => {
        set((state) => ({
          customGoals: state.customGoals.filter(g => g.id !== goalId)
        }));
      },

      // Delete a main goal
      deleteGoal: (type, quarter = null) => {
        if (type === 'quarterly' && quarter) {
          set((state) => ({
            goals: {
              ...state.goals,
              quarterly: {
                ...state.goals.quarterly,
                [quarter]: null
              }
            }
          }));
        } else {
          set((state) => ({
            goals: {
              ...state.goals,
              [type]: null
            }
          }));
        }
      },

      // Onboarding
      setOnboardingStep: (step) => set({ onboardingStep: step }),

      completeOnboarding: () => set({
        onboardingComplete: true,
        onboardingStep: 0
      }),

      skipOnboarding: () => set({
        onboardingComplete: true,
        onboardingStep: 0
      }),

      // Reset goals
      resetGoals: () => set(initialState),

      // Export goals data
      exportGoals: () => {
        const state = get();
        return JSON.stringify({
          goals: state.goals,
          customGoals: state.customGoals
        }, null, 2);
      }
    }),
    {
      name: 'skynetjoe-goals-storage',
      version: 1
    }
  )
);

export default useGoalsStore;
