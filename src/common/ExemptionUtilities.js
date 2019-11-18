/**
 * Quick Solution for Validating Exemption Errors Outside of Formik
 * @param {object} exemption object representation of an exemption
 */
const GetExemptionFormErrors = exemption => {
  const activeFormErrors = [];
  const { fromDate, toDate, type } = exemption;

  if (!type) {
    activeFormErrors.push({ key: "type", error: "Exemption Type Required" });
  }

  if (!fromDate) {
    activeFormErrors.push({ key: "fromDate", error: "From Date Required" });
  }

  if (!toDate) {
    activeFormErrors.push({ key: "toDate", error: "To Date Required" });
  }

  return activeFormErrors;
};

export { GetExemptionFormErrors };
