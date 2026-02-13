import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const THEMES = {
  dark: {
    id: 'dark',
    name: 'Dark',
    icon: '🌙',
    description: 'Easy on the eyes'
  },
  light: {
    id: 'light',
    name: 'Light',
    icon: '☀️',
    description: 'Clean and bright'
  },
  mixed: {
    id: 'mixed',
    name: 'Mixed',
    icon: '🌓',
    description: 'Best of both worlds'
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',

      setTheme: (theme) => {
        set({ theme });
        // Apply theme class to document
        document.documentElement.setAttribute('data-theme', theme);
      },

      cycleTheme: () => {
        const themes = Object.keys(THEMES);
        const currentIndex = themes.indexOf(get().theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        get().setTheme(themes[nextIndex]);
      },

      initTheme: () => {
        const theme = get().theme;
        document.documentElement.setAttribute('data-theme', theme);
      }
    }),
    {
      name: 'skynetjoe-theme-storage',
      version: 1
    }
  )
);

export default useThemeStore;
