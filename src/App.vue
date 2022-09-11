<template>
  <Heading />
  <Controller />
  <IncomeList />
  <ExpensesList />
  <div>{{ JSON.stringify(test) }}</div>
</template>

<script>
import Heading from "./components/Heading.vue";
import Graph from "./components/Graph/View.vue";
import Controller from "./components/Graph/Controller.vue";
import IncomeList from "./components/List/IncomeList.vue";
import ExpensesList from "./components/List/ExpensesList.vue";
const START_SALDO = 105.65;
export default {
  components: {
    ExpensesList,
    IncomeList,
    Controller,
    Heading,
    Graph,
  },
  computed: {
    test() {
      const allIncomes = this.$store.getters.allIncomes;
      const allExpenses = this.$store.getters.allExpenses;
      const augustIncome = this.$store.getters.getIncomesOfMonth({
        year: 2022,
        month: 7,
      });
      const augustExpences = this.$store.getters.getExpensesOfMonth({
        year: 2022,
        month: 7,
      });
      return { allIncomes, allExpenses, augustIncome, augustExpences };
    },
  },
};
</script>

<style scoped></style>
