import { useEffect, useState } from "react";

import { GetDueDateStatus } from "../../common/DatesUtilities";

/**
 * Builds the desired structure for storing monthly payment data
 * @param {object} months object that contains hte months we are going to report.
 * Key is the index of the months, the value is an actual date.
 */
const buildMonthlyData = months =>
  Object.keys(months).map(monthKey => {
    const date = months[monthKey];
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  });

/**
 * A very specific React hook that manages the state the return interval selector field
 * @param {object} requiredData Fields we need to use to manage this very specific hook
 */
const useReturnInterval = ({
  monthsFromProps = {},
  setFieldValue = () => {}
}) => {
  const [months, setMonths] = useState(monthsFromProps);
  const [returnStatus, setReturnStatus] = useState({});

  /** Get Information About the Status based on the Month(s) Selected */
  useEffect(() => {
    const isIntervalSelected = Object.keys(months).length > 0;
    if (isIntervalSelected) {
      const lastFilingMonth = months[Object.keys(months).length - 1];
      const returnStatus = GetDueDateStatus(lastFilingMonth, new Date());

      setReturnStatus(returnStatus);
      setFieldValue("monthsToReport", { ...months });
      setFieldValue("returnStatus", { ...returnStatus });
      setFieldValue("monthlyData", buildMonthlyData(months));
    }
  }, [months, setFieldValue]);

  return [
    {
      months,
      returnStatus
    },
    setMonths
  ];
};

export default useReturnInterval;
