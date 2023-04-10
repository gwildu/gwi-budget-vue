<template>
  <h1>expenses by month</h1>
  <div v-for="expenseByMonth in expenses" key="expenseByMonth.month">
    <h2>{{ expenseByMonth.month.year }} - {{ expenseByMonth.month.month }}</h2>
    <Output
      v-for="expense in expenseByMonth.expenses"
      :output="expense"
      :output-only="true"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Output from "./Form/Output.vue";

const store = useStore();

const expenses = computed(() => store.getters.expensesOfMonthsDetails());

//console.log({ expenses });
</script>

<style scoped></style>
