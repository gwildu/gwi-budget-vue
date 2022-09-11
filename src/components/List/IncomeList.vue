<template>
  <h2>Incomes</h2>
  <EntryForm transaction-type="income" />
  <List :entries="incomes" />
</template>

<script lang="ts">
import Form from "./components/Form/Form.vue";
import List from "./list.vue";
import { Entry } from "../../store/types";
import EntryForm from "../Form/EntryForm.vue";
export default {
  name: "IncomeList",
  components: { EntryForm, List },
  computed: {
    incomes(): Entry[] {
      return this.$store.getters.allIncomes;
    },
  },
};
</script>

<style scoped></style>
