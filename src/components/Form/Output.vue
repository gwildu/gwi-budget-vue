<template>
  <div :title="output.description" v-if="!isEditing">
    {{ text }}&nbsp;<button @click="deleteEntry">⨯</button>&nbsp;<button
      @click="toggle"
    >
      edit
    </button>
  </div>
  <EntryForm
    v-if="isEditing"
    :entry="output"
    transaction-type="this.output.transactionType"
    @save="toggle"
  />
</template>

<script lang="ts">
import { Entry, Month } from "../../store/types";
import { defineComponent, PropType } from "vue";
import { mapMutations } from "vuex";
import EntryForm from "./EntryForm.vue";

const formatMonth = (month: Month) => {
  const forSureNumber = Number(month);
  const prefix = forSureNumber < 9 ? "0" : "";
  const humanReadableMonthNumber = forSureNumber + 1;
  return `${prefix}${humanReadableMonthNumber}`;
};

export default defineComponent({
  name: "Output",
  components: { EntryForm },
  props: {
    output: {
      type: Object as PropType<Entry>,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    ...mapMutations(["deleteIncome", "deleteExpense"]),
    deleteEntry() {
      if (this.output.transactionType === "income") {
        this.deleteIncome(this.output);
      } else {
        this.deleteExpense(this.output);
      }
    },
    toggle() {
      this.isEditing = !this.isEditing;
    },
  },
  computed: {
    text() {
      const { name, description, amount, executionType, transactionType } =
        this.output;
      const baseText = `${name} | ${amount.toFixed(
        2
      )} | ${transactionType} | ${executionType}`;
      let fullText;
      if (executionType === "single") {
        const {
          execution: { year, month },
        } = this.output;
        return `${baseText} | ${year}-${formatMonth(month)}`;
      } else {
        const { executionInterval, firstExecution, lastExecution } =
          this.output;
        const lastExecutionText = lastExecution
          ? ` | ${lastExecution.year}-${formatMonth(lastExecution.month)}`
          : "";
        return `${baseText} | every: ${executionInterval} month | ${
          firstExecution.year
        }-${formatMonth(firstExecution.month)}${lastExecutionText}`;
      }
    },
  },
});
</script>

<style scoped></style>
