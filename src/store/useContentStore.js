import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  scheduledPosts: {},
  publishedPosts: [],
  drafts: [],
  selectedDate: new Date().toISOString().split('T')[0],
  selectedPlatform: 'all',
  viewMode: 'calendar', // 'calendar' | 'list' | 'week'
};

export const useContentStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
      setViewMode: (mode) => set({ viewMode: mode }),

      // Schedule a post
      schedulePost: (date, post) => {
        const state = get();
        const dateKey = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        const existingPosts = state.scheduledPosts[dateKey] || [];

        set({
          scheduledPosts: {
            ...state.scheduledPosts,
            [dateKey]: [...existingPosts, { ...post, id: Date.now(), scheduledFor: dateKey }]
          }
        });
      },

      // Remove scheduled post
      removeScheduledPost: (date, postId) => {
        const state = get();
        const dateKey = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        const posts = state.scheduledPosts[dateKey] || [];

        set({
          scheduledPosts: {
            ...state.scheduledPosts,
            [dateKey]: posts.filter(p => p.id !== postId)
          }
        });
      },

      // Mark as published
      markAsPublished: (date, postId) => {
        const state = get();
        const dateKey = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        const posts = state.scheduledPosts[dateKey] || [];
        const post = posts.find(p => p.id === postId);

        if (post) {
          set({
            scheduledPosts: {
              ...state.scheduledPosts,
              [dateKey]: posts.filter(p => p.id !== postId)
            },
            publishedPosts: [...state.publishedPosts, { ...post, publishedAt: new Date().toISOString() }]
          });
        }
      },

      // Save draft
      saveDraft: (draft) => {
        const state = get();
        set({
          drafts: [...state.drafts, { ...draft, id: Date.now(), createdAt: new Date().toISOString() }]
        });
      },

      // Delete draft
      deleteDraft: (draftId) => {
        const state = get();
        set({
          drafts: state.drafts.filter(d => d.id !== draftId)
        });
      },

      // Get posts for date
      getPostsForDate: (date) => {
        const state = get();
        const dateKey = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        return state.scheduledPosts[dateKey] || [];
      },

      // Get posts for week
      getPostsForWeek: (startDate) => {
        const state = get();
        const posts = [];
        const start = new Date(startDate);

        for (let i = 0; i < 7; i++) {
          const date = new Date(start);
          date.setDate(start.getDate() + i);
          const dateKey = date.toISOString().split('T')[0];
          const dayPosts = state.scheduledPosts[dateKey] || [];
          posts.push({ date: dateKey, posts: dayPosts });
        }

        return posts;
      },

      // Stats
      getStats: () => {
        const state = get();
        const totalScheduled = Object.values(state.scheduledPosts).flat().length;
        const totalPublished = state.publishedPosts.length;
        const totalDrafts = state.drafts.length;

        return { totalScheduled, totalPublished, totalDrafts };
      },

      // Reset
      resetContent: () => set(initialState),

      // Export
      exportSchedule: () => {
        const state = get();
        return JSON.stringify({
          scheduledPosts: state.scheduledPosts,
          publishedPosts: state.publishedPosts,
          drafts: state.drafts
        }, null, 2);
      },

      // Import
      importSchedule: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set({
            scheduledPosts: data.scheduledPosts || {},
            publishedPosts: data.publishedPosts || [],
            drafts: data.drafts || []
          });
          return true;
        } catch (e) {
          console.error('Import failed:', e);
          return false;
        }
      }
    }),
    {
      name: 'skynetjoe-content-storage',
      version: 1
    }
  )
);
