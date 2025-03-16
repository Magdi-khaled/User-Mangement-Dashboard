import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { pinia } from "./stores";
import router from "./router";
import Loading from "./components/Loading.vue";
import { handleSessionExpiry } from "./composables/useToken"; // Import the session expiry function

const app = createApp(App);

// app.directive("highlight", {
//   mounted(el) {
//     el.classList.add("custom-style");
//   },
// });

// Check if the token is expired when the app loads
handleSessionExpiry(router);

app.component("Loading", Loading);
app.use(pinia);
app.use(router);
app.mount("#app");
