declare module "@vue/runtime-core" {
  import { Store } from "vuex";
  import { State } from "./store/types";

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
