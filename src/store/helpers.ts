import {
  EntriesByMonth,
  Entry,
  ExecutionInterval,
  Month,
  MonthOfYear,
  State,
} from "./types";

export const getEntriesOfMonthsFilter =
  ({ month, year }: MonthOfYear) =>
  (entry: Entry) => {
    const requestedMonth = new Date(year, month);
    if (entry.executionType === "single") {
      const executionMonth = new Date(
        entry.execution.year,
        entry.execution.month
      );
      return executionMonth.getTime() === requestedMonth.getTime();
    } else {
      const { firstExecution, lastExecution } = entry;
      const firstMonth = new Date(firstExecution.year, firstExecution.month);
      const lastMonth = lastExecution
        ? new Date(lastExecution.year, lastExecution.month)
        : new Date(9999, 0);
      return (
        firstMonth.getTime() <= requestedMonth.getTime() &&
        lastMonth.getTime() >= requestedMonth.getTime()
      );
    }
  };

const pushEntryToEntriesByMonth = (entry: Entry, dataSet: EntriesByMonth) => {
  const { executionType } = entry;
  if (executionType === "single") {
    const {
      execution: { month },
    } = entry;
    dataSet[month].push(entry);
  } else {
    const { executionInterval, firstExecution } = entry;
    const executionMonths = getExecutionMonths(
      executionInterval,
      firstExecution
    );
    executionMonths.forEach((executionMonth) => {
      dataSet[executionMonth].push(entry);
    });
  }
};

const getExecutionMonths = (
  executionInterval: ExecutionInterval,
  { month, year }: MonthOfYear
) => {
  const months: Month[] = [];
  const loopCycles = 12 / executionInterval;
  const loopMonth = new Date(year, month);
  for (let i = 0; i < loopCycles; i++) {
    loopMonth.setMonth(i * executionInterval + month);
    months.push(loopMonth.getMonth() as Month);
  }
  return months;
};

export const getMonthsFromTo = (start: MonthOfYear, end: MonthOfYear) => {
  const months = [];
  let running: MonthOfYear = start;
  while (
    running.year < end.year ||
    (running.year === end.year && running.month <= end.month)
  ) {
    months.push(running);
    const { year, month } = running;
    const isDecember = month === 11;
    running = {
      year: isDecember ? year + 1 : year,
      month: isDecember ? 0 : ((month + 1) as Month),
    };
  }
  return months;
};

export const sumUp = (amounts: number[]) =>
  amounts.reduce((result, amount) => result + amount, 0);

export const deleteIncomeEntry = (state: State, id: string) => {
  findAndRemoveFromArray(state.entries.allIncomes, id);
  Object.values(state.entries.incomes).forEach((incomesOfMonth) => {
    findAndRemoveFromArray(incomesOfMonth, id);
  });
};

export const killZombies = (state: State, id: string) => {
  deleteExpensesEntry(state, id);
  deleteIncomeEntry(state, id);
};

export const deleteExpensesEntry = (state: State, id: string) => {
  findAndRemoveFromArray(state.entries.allExpenses, id);
  Object.values(state.entries.expenses).forEach((expensesByMonth) => {
    findAndRemoveFromArray(expensesByMonth, id);
  });
};

const findAndRemoveFromArray = (array: Entry[], id: string) => {
  const foundEntry = array.find((entry) => entry.id === id);
  if (!foundEntry) {
    return;
  }
  const index = array.indexOf(foundEntry);
  array.splice(index, 1);
};

export const addIncomeEntry = (state: State, entry: Entry) => {
  state.entries.allIncomes.push(entry);
  pushEntryToEntriesByMonth(entry, state.entries.incomes);
};

export const addExpenseEntry = (state: State, entry: Entry) => {
  state.entries.allExpenses.push(entry);
  pushEntryToEntriesByMonth(entry, state.entries.expenses);
};
