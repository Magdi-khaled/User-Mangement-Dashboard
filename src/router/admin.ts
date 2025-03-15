// admin.ts
import type { RouteRecordRaw } from "vue-router";
import AdminDashboard from "../views/DashboardView.vue";
import AddUser from "../views/admin/AddUserView.vue";
import EditUser from "../views/admin/EditUserView.vue";

const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requireAdminAuth: true, requiresAuth: true },
  },
  {
    path: "/admin/adduser",
    name: "AddUser",
    component: AddUser,
    meta: { requireAdminAuth: true, requiresAuth: true },
  },
  {
    path: "/admin/edituser/:id",
    name: "AdminEditUser",
    component: EditUser,
    meta: { requireAdminAuth: true, requiresAuth: true },
  },
];

export default adminRoutes;
