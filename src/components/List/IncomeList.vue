<template>
  <h2>Incomes</h2>
  <List :entries="incomes" />
</template>

<script lang="ts">
import List from "./list.vue";
import { Entry } from "../../store/types";
export default {
  name: "IncomeList",
  components: { List },
  computed: {
    incomes(): Entry[] {
      return this.$store.getters.allIncomes;
    },
  },
};
</script>

<style scoped></style>
