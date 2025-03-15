export interface User {
  id: number | null;
  name: string;
  email: string;
  password: string;
  role: "admin" | "viewer" | "manager" | null;
  status: "active" | "not active" | null;
}
