export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthOfYear = {
  year: number;
  month: Month;
};

export type ExecutionType = "single" | "multiple";

export type TransactionType = "income" | "expense" | "";

interface IEntryBase {
  id: string;
  name: string;
  description?: string;
  amount: number;
  transactionType: TransactionType;
  executionType: ExecutionType;
}

export interface IEntrySingle extends IEntryBase {
  executionType: "single";
  execution: MonthOfYear;
}

export type ExecutionInterval = 1 | 2 | 3 | 4 | 6;

export interface IEntryMultiple extends IEntryBase {
  executionType: "multiple";
  executionInterval: ExecutionInterval;
  firstExecution: MonthOfYear;
  lastExecution?: MonthOfYear;
}

export type Entry = IEntrySingle | IEntryMultiple;

export type EntriesByMonth = {
  [key: number]: Entry[];
};
// declare your own store states
export interface State {
  graph: {
    start: MonthOfYear;
    end: MonthOfYear;
    initialSaldo: number;
  };
  entries: {
    allIncomes: Entry[];
    allExpenses: Entry[];
    incomes: EntriesByMonth;
    expenses: EntriesByMonth;
  };
}
