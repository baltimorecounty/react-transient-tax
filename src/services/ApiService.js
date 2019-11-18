import axios from "axios";

let exemptionId = 0;

const apiBaseUrl = "//localhost:54727/api/transientTax";

/**
 * Get Exemption Types
 */
const GetExemptionTypes = () =>
  axios
    .get(`${apiBaseUrl}/exemptionTypes`)
    .then(({ status, data }) => (status === 200 ? data : []));

const SaveExemption = exemption => {
  const { id } = exemption;
  exemptionId =
    id ||
    exemptionId +
      1; /** fake generating an id so we don't lose track of exemptions, this will be replaced with service logic */

  return { ...exemption, id: exemptionId };
};

export { GetExemptionTypes, SaveExemption };
