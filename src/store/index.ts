import { createStore } from "vuex";
import { Entry, MonthOfYear, State } from "./types";
import {
  addExpenseEntry,
  addIncomeEntry,
  deleteExpensesEntry,
  deleteIncomeEntry,
  getEntriesOfMonthsFilter,
  getMonthsFromTo,
  killZombies,
  sumUp,
} from "./helpers";
import { initialState } from "./initialState";

export const LOCAL_STORAGE_KEY = "store";

export const store = createStore({
  state(): State {
    return initialState;
  },
  getters: {
    start: (state) => state.graph.start,
    end: (state) => state.graph.end,
    months: (state) => getMonthsFromTo(state.graph.start, state.graph.end),
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
    allIncomes: ({ entries: { allIncomes } }) => allIncomes,
    allExpenses: (state) => state.entries.allExpenses,
    income: (_, { start, end, getIncomesOfMonth }) => {
      const months = getMonthsFromTo(start, end);
      return months.map((month) => {
        return getIncomesOfMonth(month);
      });
    },
    expenses: (_, { start, end, getExpensesOfMonth }) => {
      const months = getMonthsFromTo(start, end);
      return months.map((month) => getExpensesOfMonth(month));
    },
    expensesOfMonthsDetails:
      ({ entries: { expenses } }, { start, end }) =>
      () => {
        const months = getMonthsFromTo(start, end);
        return months.filter(getEntriesOfMonthsFilter).map((monthOfYear) => ({
          month: monthOfYear,
          expenses: expenses[monthOfYear.month],
        }));
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
      return sumUp(mapped);
    },
  },
  mutations: {
    setStart(state: State, newStart: MonthOfYear) {
      validateMonthOfYear(newStart);
      state.graph.start = newStart;
    },
    setEnd(state: State, newEnd: MonthOfYear) {
      validateMonthOfYear(newEnd);
      state.graph.end = newEnd;
    },
    addIncome(state: State, entry: Entry) {
      addIncomeEntry(state, entry);
    },
    addExpense(state: State, entry: Entry) {
      addExpenseEntry(state, entry);
    },
    deleteIncome(state: State, { id }: Entry) {
      deleteIncomeEntry(state, id);
    },
    deleteExpense(state: State, { id }: Entry) {
      deleteExpensesEntry(state, id);
    },
    killZombies(state: State, id: string) {
      killZombies(state, id);
    },
    updateIncome(state: State, entry: Entry) {
      deleteIncomeEntry(state, entry.id);
      addIncomeEntry(state, entry);
    },
    updateExpense(state: State, entry: Entry) {
      deleteExpensesEntry(state, entry.id);
      addExpenseEntry(state, entry);
    },
    initializeStore: async (state) => {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (item) {
        store.replaceState({ ...state, ...JSON.parse(item) });
      }
    },
    updateInitialSaldo: (state: State, newSaldo: number) => {
      if (typeof newSaldo !== "number") {
        throw new Error(
          "cannot update initialSaldo, as new saldo value is not a number"
        );
      }
      state.graph.initialSaldo = newSaldo;
    },
  },
});

store.subscribe((_, state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
});

const VALIDATION_MESSAGE_M_O_Y = "input is not of type MonthOfYear";
const validateMonthOfYear = (input: MonthOfYear) => {
  if (typeof input.year !== "number") {
    throw new Error(VALIDATION_MESSAGE_M_O_Y);
  }
  if (typeof input.month !== "number") {
    throw new Error(VALIDATION_MESSAGE_M_O_Y);
  }
  if (input.month < 0 || input.month > 11) {
    throw new Error(VALIDATION_MESSAGE_M_O_Y);
  }
  if (!Number.isInteger(input.month)) {
    throw new Error(VALIDATION_MESSAGE_M_O_Y);
  }
  return;
};
