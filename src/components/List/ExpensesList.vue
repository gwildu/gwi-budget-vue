<template>
  <h2>Expenses</h2>
  <EntryForm transaction-type="expense" />
  <List :entries="expenses" />
</template>

<script lang="ts">
import List from "./list.vue";
import { Entry } from "../../store/types";
import EntryForm from "../Form/EntryForm.vue";
export default {
  name: "ExpensesList",
  components: { EntryForm, List },
  computed: {
    expenses(): Entry[] {
      return this.$store.getters.allExpenses;
    },
  },
};
</script>

<style scoped></style>
