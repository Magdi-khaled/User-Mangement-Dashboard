import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { pinia } from "./stores";
import router from "./router";
import Loading from "./components/Loading.vue";

const app = createApp(App);

// app.directive("highlight", {
//   mounted(el) {
//     el.classList.add("custom-style");
//   },
// });

app.component("Loading", Loading);
app.use(pinia);
app.use(router);
app.mount("#app");
