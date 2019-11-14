import React from "react";
import { CalculateTotalByMonth } from "../common/Calculations";

const getTotals = (monthsToReport, fieldsToSum = []) =>
  Object.keys(monthsToReport).reduce((totals, monthKey) => {
    const sum = totals.reduce((fieldTotal, data) => {
      return (total += CalculateTotalByMonth(fieldTotal, monthKey));
    }, 0);

    totals.push({ total: sum, label: monthKey });

    return totals;
  }, []);

const CalculatedField = props => {
  const { monthsToReport, fieldsToSum = [] } = props;

  return <p>test</p>;
};

export default CalculatedField;
