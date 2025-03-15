import type { RouteRecordRaw } from "vue-router";
import ViewerDashboard from "../views/DashboardView.vue";

const viewerRoutes: RouteRecordRaw[] = [
  {
    path: "/viewer",
    name: "ViewerDashboard",
    component: ViewerDashboard,
    meta: { requireViewerAuth: true, requiresAuth: true },
  },
];

export default viewerRoutes;
