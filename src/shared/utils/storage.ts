export const storage = {

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (key: ${key}):`, error);
      return false;
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (key: ${key}):`, error);
      return false;
    }
  },

  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
} as const;
