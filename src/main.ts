import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "./store";

createApp({
  extends: App,
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
})
  .use(store)
  .mount("#app");
