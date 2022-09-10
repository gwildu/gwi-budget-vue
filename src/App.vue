<template>
  <Heading />
  <StoreOutput />
  <!--  <Graph-->
  <!--    :start="{ year: 2022, month: 7 }"-->
  <!--    :end="{ year: 2023, month: 6 }"-->
  <!--    :income-data="[40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12]"-->
  <!--    :expenses-data="[-20, -5, -24, -20, -5, -24, -20, -5, -24, -20, -5, -24]"-->
  <!--    :running-saldo-data="[20, 35, 23, 43, 58, 46, 66, 81, 69, 89, 104, 92]"-->
  <!--  />-->
  <Controller />
  <Form name="something" />
  <IncomeList />
  <ExpensesList />
  <div>{{ JSON.stringify(test) }}</div>
</template>

<script>
import Heading from "./components/Heading.vue";
import StoreOutput from "./components/StoreOutput.vue";
import Graph from "./components/Graph/View.vue";
import Controller from "./components/Graph/Controller.vue";
import IncomeList from "./components/List/IncomeList.vue";
import ExpensesList from "./components/List/ExpensesList.vue";
import Form from "./components/Form/Form.vue";
const START_SALDO = 105.65;
export default {
  components: {
    Form,
    ExpensesList,
    IncomeList,
    Controller,
    Heading,
    StoreOutput,
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
