// manager.ts
import type { RouteRecordRaw } from "vue-router";
import ManagerDashboard from "../views/DashboardView.vue";
import EditUser from "../views/admin/EditUserView.vue";

const managerRoutes: RouteRecordRaw[] = [
  {
    path: "/manager",
    name: "ManagerDashboard",
    component: ManagerDashboard,
    meta: { requireManagerAuth: true, requiresAuth: true },
  },
  {
    path: "/manager/edituser/:id",
    name: "ManagerEditUser",
    component: EditUser,
    meta: { requireManagerAuth: true, requiresAuth: true },
  },
];

export default managerRoutes;
