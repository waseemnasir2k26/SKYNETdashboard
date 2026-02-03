import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Multi-user authentication store with localStorage
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Current logged-in user
      currentUser: null,
      isAuthenticated: false,

      // All registered users
      users: {},

      // Register a new user
      register: (email, password, name) => {
        const state = get();
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        if (state.users[normalizedEmail]) {
          return { success: false, error: 'User already exists with this email' };
        }

        // Validate inputs
        if (!email || !password || !name) {
          return { success: false, error: 'All fields are required' };
        }

        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters' };
        }

        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          email: normalizedEmail,
          password, // In production, this should be hashed
          name: name.trim(),
          createdAt: new Date().toISOString(),
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
          // User-specific data store key
          dataKey: `skynetjoe-dashboard-${normalizedEmail}`
        };

        set((state) => ({
          users: { ...state.users, [normalizedEmail]: newUser },
          currentUser: newUser,
          isAuthenticated: true
        }));

        // Initialize user's dashboard data
        const userDataKey = `skynetjoe-dashboard-${normalizedEmail}`;
        if (!localStorage.getItem(userDataKey)) {
          localStorage.setItem(userDataKey, JSON.stringify({
            state: getInitialDashboardState(),
            version: 1
          }));
        }

        return { success: true, user: newUser };
      },

      // Login existing user
      login: (email, password) => {
        const state = get();
        const normalizedEmail = email.toLowerCase().trim();
        const user = state.users[normalizedEmail];

        if (!user) {
          return { success: false, error: 'No account found with this email' };
        }

        if (user.password !== password) {
          return { success: false, error: 'Incorrect password' };
        }

        set({ currentUser: user, isAuthenticated: true });

        // Switch to user's data store
        switchUserDataStore(normalizedEmail);

        return { success: true, user };
      },

      // Logout
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
        // Reset main store to initial state after logout
        localStorage.removeItem('skynetjoe-dashboard-storage');
      },

      // Update user profile
      updateProfile: (updates) => {
        const state = get();
        if (!state.currentUser) return { success: false, error: 'Not logged in' };

        const updatedUser = { ...state.currentUser, ...updates };

        set((state) => ({
          currentUser: updatedUser,
          users: {
            ...state.users,
            [state.currentUser.email]: updatedUser
          }
        }));

        return { success: true };
      },

      // Change password
      changePassword: (currentPassword, newPassword) => {
        const state = get();
        if (!state.currentUser) return { success: false, error: 'Not logged in' };

        if (state.currentUser.password !== currentPassword) {
          return { success: false, error: 'Current password is incorrect' };
        }

        if (newPassword.length < 6) {
          return { success: false, error: 'New password must be at least 6 characters' };
        }

        const updatedUser = { ...state.currentUser, password: newPassword };

        set((state) => ({
          currentUser: updatedUser,
          users: {
            ...state.users,
            [state.currentUser.email]: updatedUser
          }
        }));

        return { success: true };
      },

      // Delete account
      deleteAccount: () => {
        const state = get();
        if (!state.currentUser) return;

        const email = state.currentUser.email;
        const dataKey = state.currentUser.dataKey;

        // Remove user's dashboard data
        localStorage.removeItem(dataKey);

        // Remove user from users list
        const { [email]: _, ...remainingUsers } = state.users;

        set({
          users: remainingUsers,
          currentUser: null,
          isAuthenticated: false
        });
      },

      // Get current user's data key
      getCurrentUserDataKey: () => {
        const state = get();
        return state.currentUser?.dataKey || 'skynetjoe-dashboard-storage';
      }
    }),
    {
      name: 'skynetjoe-auth-storage',
      version: 1
    }
  )
);

// Initial dashboard state for new users
function getInitialDashboardState() {
  return {
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
    points: { total: 0, today: 0, history: [] },
    streak: { current: 0, longest: 0, lastActiveDate: null },
    earnedBadges: [],
    completedChallenges: [],
    notes: {},
    focusMode: false,
    selectedWeek: 1,
    activeTab: 'dashboard'
  };
}

// Helper function to switch user data store
function switchUserDataStore(email) {
  const userDataKey = `skynetjoe-dashboard-${email}`;
  const userData = localStorage.getItem(userDataKey);

  if (userData) {
    // Copy user's data to main storage key
    localStorage.setItem('skynetjoe-dashboard-storage', userData);
    // Trigger a page reload to refresh the store
    window.location.reload();
  }
}

// Save current state to user's storage before logout
export function saveCurrentUserData() {
  const authState = useAuthStore.getState();
  if (authState.currentUser && authState.isAuthenticated) {
    const mainData = localStorage.getItem('skynetjoe-dashboard-storage');
    if (mainData) {
      localStorage.setItem(authState.currentUser.dataKey, mainData);
    }
  }
}

// Auto-save on window unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', saveCurrentUserData);
}

// Initialize demo account on first load
const initializeDemoAccount = () => {
  const state = useAuthStore.getState();
  const demoEmail = 'demo@skynetjoe.com';

  if (!state.users[demoEmail]) {
    state.register(demoEmail, 'demo123', 'Demo User');
    // Logout after creating demo account so user sees login screen
    useAuthStore.setState({ currentUser: null, isAuthenticated: false });
  }
};

// Run initialization after a short delay to ensure store is ready
if (typeof window !== 'undefined') {
  setTimeout(initializeDemoAccount, 100);
}
