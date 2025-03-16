import { getUserRole } from "./useAuth";
export const navigateDashboard = (): Object => {
  if (getUserRole() === "admin") return { name: "AdminDashboard" };
  else if (getUserRole() === "manager") return { name: "ManagerDashboard" };
  else return { name: "ViewerDashboard" };
};
