<template>
  <h2>Expenses</h2>
  <List :entries="expenses" />
</template>

<script lang="ts">
import List from "./list.vue";
import { Entry } from "../../store/types";
export default {
  name: "ExpensesList",
  components: { List },
  computed: {
    expenses(): Entry[] {
      return this.$store.getters.allExpenses;
    },
  },
};
</script>

<style scoped></style>
