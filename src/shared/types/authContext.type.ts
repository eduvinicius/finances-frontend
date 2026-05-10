export type UserRole = 'Admin' | 'User';

export interface IAuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  isUser: boolean;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
  getUserToken: () => string | null;
}