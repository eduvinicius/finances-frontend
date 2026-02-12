import type { LoginResponse } from "./login.type";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  getUserData: () => LoginResponse | null;
}