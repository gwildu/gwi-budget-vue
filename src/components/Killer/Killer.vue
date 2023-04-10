<template>
  <div>
    <input type="text" v-model="killId" /><button @click="kill">
      kill zombie
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Killer",
  data() {
    return {
      killId: "",
    };
  },
  methods: {
    ...mapMutations(["killZombies"]),
    kill() {
      this.killZombies(this.killId);
      this.killId = "";
    },
  },
};
</script>

<style scoped></style>
