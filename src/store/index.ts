import { createStore } from "vuex";
import {
  EntriesByMonth,
  Entry,
  ExecutionInterval,
  Month,
  MonthOfYear,
  State,
} from "./types";

export const LOCAL_STORAGE_KEY = "store";

const now = new Date();
const current: MonthOfYear = {
  year: now.getFullYear(),
  month: now.getMonth() as Month,
};

export const store = createStore({
  state(): State {
    return {
      graph: {
        start: { year: 2022, month: 7 },
        end: {
          year: current.year + 1,
          month: current.month === 0 ? 11 : ((current.month - 1) as Month),
        },
        initialSaldo: 0,
      },
      entries: {
        allIncomes: [],
        allExpenses: [],
        incomes: {
          [0]: [],
          [1]: [],
          [2]: [],
          [3]: [],
          [4]: [],
          [5]: [],
          [6]: [],
          [7]: [],
          [8]: [],
          [9]: [],
          [10]: [],
          [11]: [],
        },
        expenses: {
          [0]: [],
          [1]: [],
          [2]: [],
          [3]: [],
          [4]: [],
          [5]: [],
          [6]: [],
          [7]: [],
          [8]: [],
          [9]: [],
          [10]: [],
          [11]: [],
        },
      },
    };
  },
  getters: {
    start: (state) => state.graph.start,
    end: (state) => state.graph.end,
    initialSaldo: (state) => state.graph.initialSaldo,
    runningSaldo: (
      _,
      { start, end, initialSaldo, getIncomesOfMonth, getExpensesOfMonth }
    ) => {
      const months = getMonthsFromTo(start, end);
      return months.reduce<number[]>((accumulator, current) => {
        const income = getIncomesOfMonth(current) as number;
        const expenses = getExpensesOfMonth(current) as number;
        const { length } = accumulator;
        const lastSaldo = length ? accumulator[length - 1] : initialSaldo;
        accumulator.push(lastSaldo + income - expenses);
        return accumulator;
      }, []);
    },
    allIncomes: ({ entries: { allIncomes } }) => {
      const result = allIncomes;
      console.log({ result });
      return result;
    },
    allExpenses: (state) => state.entries.allExpenses,
    income: (_, { start, end, getIncomesOfMonth }) => {
      const months = getMonthsFromTo(start, end);
      return months.map((month) => {
        const incomeOfMonth = getIncomesOfMonth(month);
        return incomeOfMonth;
      });
    },
    expenses: (_, { start, end, getExpensesOfMonth }) => {
      const months = getMonthsFromTo(start, end);
      const expenses = months.map((month) => getExpensesOfMonth(month));
      return expenses;
    },
    getExpensesOfMonth: (state: State) => (month: MonthOfYear) =>
      sumUp(
        state.entries.expenses[month.month]
          .filter(getEntriesOfMonthsFilter(month))
          .map((entry) => entry.amount)
      ),
    getIncomesOfMonth: (state: State) => (month: MonthOfYear) => {
      const incomes = state.entries.incomes[month.month];
      const filtered = incomes.filter(getEntriesOfMonthsFilter(month));
      const mapped = filtered.map((entry) => entry.amount);
      const summedUp = sumUp(mapped);
      return summedUp;
    },
  },
  mutations: {
    addIncome(state: State, entry: Entry) {
      addIncomeEntry(state, entry);
    },
    addExpense(state: State, entry: Entry) {
      addExpenseEntry(state, entry);
    },
    deleteIncome(state: State, entry: Entry) {
      deleteIncomeEntry(state, entry);
    },
    deleteExpense(state: State, entry: Entry) {
      deleteExpensesEntry(state, entry);
    },
    updateIncome(state: State, entry: Entry) {
      deleteIncomeEntry(state, entry);
      addIncomeEntry(state, entry);
    },
    updateExpense(state: State, entry: Entry) {
      deleteExpensesEntry(state, entry);
      addExpenseEntry(state, entry);
    },
    initializeStore: async (state) => {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log({ item, replaceState: typeof store.replaceState });
      if (item) {
        store.replaceState({ ...state, ...JSON.parse(item) });
      }
    },
  },
});

store.subscribe((_, state) => {
  console.log({ state });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
});

const getEntriesOfMonthsFilter =
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
      const result =
        firstMonth.getTime() <= requestedMonth.getTime() &&
        lastMonth.getTime() >= requestedMonth.getTime();
      return result;
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

const getMonthsFromTo = (start: MonthOfYear, end: MonthOfYear) => {
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

const sumUp = (amounts: number[]) =>
  amounts.reduce((result, amount) => result + amount, 0);

const deleteIncomeEntry = (state: State, entry: Entry) => {
  findAndRemoveFromArray(state.entries.allIncomes, entry);
  Object.values(state.entries.incomes).forEach((incomesOfMonth) => {
    findAndRemoveFromArray(incomesOfMonth, entry);
  });
};

const deleteExpensesEntry = (state: State, entry: Entry) => {
  findAndRemoveFromArray(state.entries.allExpenses, entry);
  Object.values(state.entries.expenses).forEach((expensesByMonth) => {
    findAndRemoveFromArray(expensesByMonth, entry);
  });
};

const findAndRemoveFromArray = (array: Entry[], entryToRemove: Entry) => {
  const foundEntry = array.find((entry) => entry.id === entryToRemove.id);
  if (!foundEntry) {
    return;
  }
  const index = array.indexOf(foundEntry);
  array.splice(index, 1);
};

const addIncomeEntry = (state: State, entry: Entry) => {
  state.entries.allIncomes.push(entry);
  pushEntryToEntriesByMonth(entry, state.entries.incomes);
};

const addExpenseEntry = (state: State, entry: Entry) => {
  state.entries.allExpenses.push(entry);
  pushEntryToEntriesByMonth(entry, state.entries.expenses);
};
