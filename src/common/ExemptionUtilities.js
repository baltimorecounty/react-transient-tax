/**
 * Quick Solution for Validating Exemption Errors Outside of Formik
 * @param {object} exemption object representation of an exemption
 */
const GetExemptionFormErrors = exemption => {
  const activeFormErrors = [];
  const { fromDate, toDate, type, isDateRangeAtLeast90days } = exemption;

  if (!type) {
    activeFormErrors.push({
      key: "exemptionType",
      error: "Exemption Type Required"
    });
  }

  if (!fromDate) {
    activeFormErrors.push({ key: "fromDate", error: "From Date Required" });
  }

  if (!toDate) {
    activeFormErrors.push({ key: "toDate", error: "To Date Required" });
  }

  if (type === 1 && fromDate && toDate && !isDateRangeAtLeast90days) {
    activeFormErrors.push({
      key: "isDateRangeAtLeast90days",
      error: "Data range must be at least 90 consecutive days"
    });
  }

  return activeFormErrors;
};

/**
 * Check to verify if a given exemption field has an value less than 0.
 * Note: Exemption values are negative
 * @param {array} exemptionTotals Array of exemption field total objects
 */
const HasAtLeast1Exemption = (monthlyData = []) =>
  monthlyData.some(
    ({
      nonTransientRentalCollected = 0,
      governmentExemptRentalCollected = 0
    }) => !!governmentExemptRentalCollected || !!nonTransientRentalCollected
  );

export { GetExemptionFormErrors, HasAtLeast1Exemption };
