export const CHART_CONFIG = {
  chartOptions: {
    responsive: true,
  },
  chartId: "bar-chart",
  datasetIdKey: "label",
  width: 1000,
  height: 400,
  cssClasses: "",
  styles: {},
  plugins: [],
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const INCOME_DEFAULTS = {
  label: "income",
  order: 1,
  backgroundColor: "lightgreen",
  borderColor: "white",
  stack: "Stack 0",
};

export const EXPENSES_DEFAULT = {
  label: "expenses",
  order: 2,
  backgroundColor: "salmon",
  borderColor: "white",
  stack: "Stack 0",
};

export const RUNNING_SALDO_DEFAULT = {
  label: "saldo",
  order: 0,
  type: "line",
  borderColor: "blue",
  backgroundColor: "white",
};
