<template>
  <div>
    <H2>Expenses</H2>
    <EntryForm transaction-type="expense" />
    <List :entries="expenses" />
  </div>
</template>

<script lang="ts">
import List from "./list.vue";
import { Entry } from "../../store/types";
import EntryForm from "../Form/EntryForm.vue";
import H2 from "../Typography/H2.vue";
export default {
  name: "ExpensesList",
  components: { EntryForm, List, H2 },
  computed: {
    expenses(): Entry[] {
      return this.$store.getters.allExpenses;
    },
  },
};
</script>

<style scoped></style>
