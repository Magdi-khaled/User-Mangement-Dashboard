export interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  user: {
    email: string | null;
    password: string | null;
  };
}
