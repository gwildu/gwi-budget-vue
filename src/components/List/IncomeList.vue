<template>
  <div>
    <H2>Incomes</H2>
    <EntryForm transaction-type="income" />
    <List :entries="incomes" />
  </div>
</template>

<script lang="ts">
import List from "./list.vue";
import { Entry, IEntryMultiple, IEntrySingle } from "../../store/types";
import EntryForm from "../Form/EntryForm.vue";
import H2 from "../Typography/H2.vue";
export default {
  name: "IncomeList",
  components: { H2, EntryForm, List },
  computed: {
    incomes(): Entry[] {
      return this.$store.getters.allIncomes.sort((a: Entry, b: Entry) => {
        const aExecution =
          (a as IEntrySingle).execution || (a as IEntryMultiple).firstExecution;
        const bExecution =
          (b as IEntrySingle).execution || (b as IEntryMultiple).firstExecution;
        const aDate = new Date(aExecution.year, aExecution.month);
        const bDate = new Date(bExecution.year, bExecution.month);
        return aDate.getTime() - bDate.getTime();
      });
    },
  },
};
</script>

<style scoped></style>
