import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
