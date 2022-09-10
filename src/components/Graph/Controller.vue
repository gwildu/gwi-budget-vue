<template>
  <View
    :start="start"
    :end="end"
    :income-data="income"
    :expenses-data="expenses"
    :running-saldo-data="runningSaldo"
  />
</template>

<script lang="ts">
import View from "./View.vue";
import { MonthOfYear, State } from "../../store/types";
export default {
  name: "Controller",
  components: { View },
  computed: {
    start(): MonthOfYear {
      return this.$store.getters.start;
    },
    end(): MonthOfYear {
      return this.$store.getters.end;
    },
    income(): number[] {
      return this.$store.getters.income;
    },
    expenses(): number[] {
      return this.$store.getters.expenses.map((expense) => -expense);
    },
    runningSaldo(): number[] {
      return this.$store.getters.runningSaldo;
    },
  },
};
</script>

<style scoped></style>
