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
import { MonthOfYear } from "../../store/types";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "Controller",
  components: { View },
  computed: {
    ...mapGetters({
      startState: "start",
      endState: "end",
      incomeState: "income",
      expensesState: "expenses",
      runningSaldoState: "runningSaldo",
    }),
    start(): MonthOfYear {
      return this.startState;
    },
    end(): MonthOfYear {
      return this.endState;
    },
    income(): number[] {
      return this.incomeState;
    },
    expenses(): number[] {
      return this.expensesState.map((expense) => -expense);
    },
    runningSaldo(): number[] {
      return this.runningSaldoState;
    },
  },
});
</script>

<style scoped></style>
