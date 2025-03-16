import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { pinia } from "./stores";
import router from "./router";
import Loading from "./components/Loading.vue";
import { handleSessionExpiry } from "./composables/useToken";
import { getUserRole } from "./composables/useAuth";

const app = createApp(App);

// Custom directive
app.directive("permission", {
  async mounted(el) {
    const role = await getUserRole();
    const allowedRoles = ["admin", "manager"];
    if (allowedRoles.includes(role)) {
      return true;
    } else {
      el.style.display = "none";
      //   navigateDashboard();
      return false;
    }
  },
});

handleSessionExpiry(router);

app.component("Loading", Loading);
app.use(pinia);
app.use(router);
app.mount("#app");
