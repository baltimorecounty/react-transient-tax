/**
 * Quick Solution for Validating Exemption Errors Outside of Formik
 * @param {object} exemption object representation of an exemption
 */
const GetExemptionFormErrors = (exemption, exemptionErrorCheck=true) => {
  const activeFormErrors = [];
  const { fromDate, toDate, type } = exemption;

  if (exemptionErrorCheck){
    if (!type) {
      activeFormErrors.push({ key: "type", error: "Exemption Type Required" });
    }
  
    if (!fromDate) {
      activeFormErrors.push({ key: "fromDate", error: "From Date Required" });
    }
  
    if (!toDate) {
      activeFormErrors.push({ key: "toDate", error: "To Date Required" });
    }
  
  }
  else{

    if (!type) {
      activeFormErrors.push({ key: "type", error: "Exemption Type Required" });
    }
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
