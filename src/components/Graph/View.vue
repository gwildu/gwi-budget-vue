<script lang="ts">
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, registerables } from "chart.js";
import { getLabels } from "./labels";
import {
  CHART_CONFIG,
  INCOME_DEFAULTS,
  EXPENSES_DEFAULT,
  RUNNING_SALDO_DEFAULT,
} from "./config";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { MonthOfYear } from "../../store/types";

ChartJS.register(...registerables);

export default defineComponent({
  components: { Bar },
  name: "View",
  props: {
    start: {
      type: Object as PropType<MonthOfYear>,
      required: true,
    },
    end: {
      type: Object as PropType<MonthOfYear>,
      required: true,
    },
    incomeData: {
      type: Array as PropType<number[]>,
      default: [],
    },
    expensesData: {
      type: Array as PropType<number[]>,
      default: [],
    },
    runningSaldoData: {
      type: Array as PropType<number[]>,
      default: [],
    },
  },
  computed: {
    chartData(): any {
      const labels = getLabels({
        start: this.start,
        end: this.end,
      });
      return {
        labels,
        datasets: [
          {
            ...INCOME_DEFAULTS,
            data: this.incomeData,
          },
          {
            ...EXPENSES_DEFAULT,
            data: this.expensesData,
          },
          {
            ...RUNNING_SALDO_DEFAULT,
            data: this.runningSaldoData,
          },
        ],
      };
    },
  },
  data() {
    return { ...CHART_CONFIG };
  },
});
</script>

<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :scales="scales"
  />
</template>

<style scoped></style>
