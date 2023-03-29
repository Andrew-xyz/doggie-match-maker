import { createApp } from "vue";
import App from "./App.vue";

// Instantiate App
const app = createApp(App);

// Tailwind CSS Import
import "./index.css";

// Vue Router Import
import router from "./router/router.js";

// Mount Application
app.use(router);
app.mount("#app");
