export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

export const getUserRole = (): "admin" | "manager" | "viewer" | null => {
  return localStorage.getItem("role") as "admin" | "manager" | "viewer" | null;
};
