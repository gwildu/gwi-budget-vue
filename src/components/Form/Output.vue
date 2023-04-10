<template>
  <div class="line" :title="output.description" v-if="!isEditing">
    <div class="text">
      {{ text }}
    </div>
    <div v-if="!outputOnly" class="buttons">
      <button @click="deleteEntry">⨯</button>
      <button @click="toggle">edit</button>
      <button @click="copyId" title="copy to clipboard">ID</button>
    </div>
  </div>
  <EntryForm
    v-if="isEditing"
    :entry="output"
    :transaction-type="this.output.transactionType"
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
    outputOnly: {
      type: Boolean,
      default: false,
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
    copyId() {
      navigator.clipboard.writeText(this.output.id);
    },
  },
  computed: {
    text() {
      const { name, amount, executionType, transactionType } = this.output;
      //console.log({ output: this.output });
      const baseText = `${name} | ${amount.toFixed(
        2
      )} | ${transactionType} | ${executionType}`;
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

<style scoped>
.line {
  display: flex;
  justify-content: flex-start;
  margin: 8px 0;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 8px;
}
.text {
  min-width: 600px;
}
.buttons {
  display: flex;
  align-items: stretch;
  gap: 8px;
}
</style>
