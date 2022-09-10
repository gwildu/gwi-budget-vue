<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { Entry } from "../../store/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Output",
  props: {
    output: {
      type: Object as PropType<Entry>,
      required: true,
    },
  },
  computed: {
    text() {
      const { name, description, amount, executionType } = this.output;
      const baseText = `name: ${name} | description: ${description} | amount: ${amount.toFixed(
        2
      )}`;
      let fullText;
      if (type === "single") {
        const {
          execution: { year, month },
        } = this.output;
        return `${baseText} | execution: ${year}-${month}`;
      } else {
        const { executionInterval, firstExecution, lastExecution } =
          this.output;
        const lastExecutionText = lastExecution
          ? ` | last execution: ${lastExecution.year}-${lastExecution.month}`
          : "";
        return `${baseText} | executed every: ${executionInterval} month | first execution: ${firstExecution.year}-${firstExecution.month}${lastExecutionText}`;
      }
    },
  },
});
</script>

<style scoped></style>
