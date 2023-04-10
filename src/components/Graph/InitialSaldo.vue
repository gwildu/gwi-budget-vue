<template>
  <input
    title="initial saldo"
    id="initial-saldo"
    type="number"
    v-model="initialSaldoValue"
  /><button @click="save">save</button>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "InitialSaldo",
  data() {
    return {
      initialSaldoValue: 0,
    };
  },
  methods: {
    ...mapMutations(["updateInitialSaldo"]),
    save() {
      this.updateInitialSaldo(this.initialSaldoValue);
    },
  },
  computed: {
    ...mapGetters(["initialSaldo"]),
  },
  mounted() {
    this.initialSaldoValue = this.initialSaldo;
  },
};
</script>

<style scoped></style>
