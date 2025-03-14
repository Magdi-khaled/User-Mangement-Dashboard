import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { pinia } from "./stores";
import router from "./router";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
