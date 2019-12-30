/**
 * Quick Solution for Validating Exemption Errors Outside of Formik
 * @param {object} exemption object representation of an exemption
 */
const GetExemptionFormErrors = (exemption,isFromDateDirty,isToDateDirty,) => {
  const activeFormErrors = [];
  const { fromDate, toDate, type } = exemption;
// console.log('exemptionErrorCheck:' + exemptionErrorCheck);
// console.log('isFromDateDirty:' + isFromDateDirty);
// console.log('isToDateDirty:' + isToDateDirty);

    if (!type) {
      activeFormErrors.push({ key: "type", error: "Exemption Type Required" });
    }
      //if (!fromDate) {
        if (isFromDateDirty ===true && !fromDate) {
          activeFormErrors.push({ key: "fromDate", error: "From Date Required" });
        }
        if (isToDateDirty===true && !toDate) {
        //if (!toDate) {
          activeFormErrors.push({ key: "toDate", error: "To Date Required" });
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
