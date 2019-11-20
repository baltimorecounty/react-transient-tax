import axios from "axios";
import { MapTaxReturnToServerModel } from "../data/TaxReturnMapper";

let exemptionId = 0;

const apiBaseUrl = "//localhost:54727/api/transientTax";

/**
 * Get a lookup value for a given endpoint
 * @param {string} endpoint name of endpoint for lookup values
 */
const GetLookupItem = endpoint =>
  axios
    .get(`${apiBaseUrl}/${endpoint}`)
    .then(({ status, data }) => (status === 200 ? data : []))
    .catch(
      error =>
        console.error(`Something went wrong looking up values: ${error}`) ||
        error
    );

/**
 * Get Exemption Types
 */
const GetExemptionTypes = () => GetLookupItem("exemptionTypes");

/**
 * Get Filing Types
 */
const GetFilingTypes = () => GetLookupItem("filingTypes");

const SaveExemption = exemption => {
  const { id } = exemption;
  exemptionId =
    id ||
    exemptionId +
      1; /** fake generating an id so we don't lose track of exemptions, this will be replaced with service logic */

  return { ...exemption, id: exemptionId };
};

const SaveReturn = taxReturn =>
  axios
    .post(
      `${apiBaseUrl}/return`,
      console.log(MapTaxReturnToServerModel(taxReturn)) ||
        MapTaxReturnToServerModel(taxReturn)
    )
    .then(({ status, data }) => (status === 200 ? data : []))
    .catch(
      error =>
        console.error(`Something went wrong looking up values: ${error}`) ||
        error
    );

export { GetExemptionTypes, GetFilingTypes, SaveExemption, SaveReturn };
