import { MonthOfYear } from "../../store/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

export const getLabels = ({
  start,
  end,
}: {
  start: MonthOfYear;
  end: MonthOfYear;
}) => {
  const startDate = new Date(start.year, start.month);
  const endDate = new Date(end.year, end.month);
  const labels = [];
  let run = new Date(startDate);
  while (run.getTime() <= endDate.getTime()) {
    const month = run.getMonth();
    const year = run.getFullYear();
    labels.push(`${MONTHS[month]} ${year - 2000}`);
    run = new Date(
      month === 11 ? year + 1 : year,
      month === 11 ? 0 : month + 1
    );
  }
  return labels;
};
