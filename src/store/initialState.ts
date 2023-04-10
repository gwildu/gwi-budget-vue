import { Month, MonthOfYear, State } from "./types";

const START_SALDO = 1555.65;
const START_MONTH = { year: 2022, month: 7 as Month };

const now = new Date();
const current: MonthOfYear = {
  year: now.getFullYear(),
  month: now.getMonth() as Month,
};

export const initialState: State = {
  graph: {
    start: START_MONTH,
    end: {
      year: current.year + 1,
      month: current.month === 0 ? 11 : ((current.month - 1) as Month),
    },
    initialSaldo: START_SALDO,
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
