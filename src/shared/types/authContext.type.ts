export type UserRole = 'Admin' | 'User';

export interface IAuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  userId: string | null;
  isAdmin: boolean;
  isUser: boolean;
  login: (token: string) => void;
  logout: () => void;
  getUserToken: () => string | null;
}