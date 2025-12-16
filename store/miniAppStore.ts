import { create } from 'zustand';

export interface MiniApp {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  category: string;
  featured: boolean;
  verified: boolean;
}

export type ViewMode = 'list' | 'grid';

interface MiniAppState {
  recentApps: MiniApp[];
  favoriteApps: string[];
  currentApp: MiniApp | null;
  isLoading: boolean;
  viewMode: ViewMode;
  selectedCategory: string | null;
  page: number;
  hasMore: boolean;
  
  setCurrentApp: (app: MiniApp | null) => void;
  addToRecent: (app: MiniApp) => void;
  toggleFavorite: (appId: string) => void;
  clearRecent: () => void;
  setLoading: (isLoading: boolean) => void;
  toggleViewMode: () => void;
  setCategory: (category: string | null) => void;
  loadMore: () => void;
  resetPagination: () => void;
}

export const useMiniAppStore = create<MiniAppState>((set) => ({
  recentApps: [],
  favoriteApps: [],
  currentApp: null,
  isLoading: false,
  viewMode: 'list',
  selectedCategory: null,
  page: 1,
  hasMore: true,
  
  setCurrentApp: (app) => set({ currentApp: app }),
  
  addToRecent: (app) =>
    set((state) => {
      const filtered = state.recentApps.filter((a) => a.id !== app.id);
      return {
        recentApps: [app, ...filtered].slice(0, 10),
      };
    }),
  
  toggleFavorite: (appId) =>
    set((state) => ({
      favoriteApps: state.favoriteApps.includes(appId)
        ? state.favoriteApps.filter((id) => id !== appId)
        : [...state.favoriteApps, appId],
    })),
  
  clearRecent: () => set({ recentApps: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'list' ? 'grid' : 'list',
    })),
  
  setCategory: (category) =>
    set({ selectedCategory: category, page: 1 }),
  
  loadMore: () =>
    set((state) => ({
      page: state.page + 1,
    })),
  
  resetPagination: () =>
    set({ page: 1, hasMore: true }),
}));
