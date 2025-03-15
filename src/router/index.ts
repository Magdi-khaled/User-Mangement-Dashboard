import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "./admin";
import managerRoutes from "./manager";
import viewerRoutes from "./viewer";

// views
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import ForgerPasswordView from "../views/auth/ForgetPasswordView.vue";
import UserDetailView from "../views/UserDetailView.vue";
import UnAuthorized from "../views/UnauthorizedView.vue";

// composables
import { getUserRole, isAuthenticated } from "../composables/useAuth";

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Home",
    name: "Home",
    component: HomeView,
  },
  ...adminRoutes,
  ...managerRoutes,
  ...viewerRoutes,
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgerPasswordView,
  },
  {
    path: "/userdetails/:id",
    name: "UserDetail",
    component: UserDetailView,
  },
  {
    path: "/UnAuthorized",
    name: "Unauthorized",
    component: UnAuthorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = getUserRole();
  const isLoggedIn = isAuthenticated();

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: "Login" });
  }

  if (to.meta.requireAdminAuth && userRole !== "admin") {
    return next({ name: "Unauthorized" });
  }

  if (to.meta.requireManagerAuth && userRole !== "manager") {
    return next({ name: "Unauthorized" });
  }

  if (to.meta.requireViewerAuth && userRole !== "viewer") {
    return next({ name: "Unauthorized" });
  }

  next();
});

export default router;
