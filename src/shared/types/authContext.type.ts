export interface IAuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getUserToken: () => string | null;
}