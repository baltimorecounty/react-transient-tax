import axios from "axios";
import {
  MapTaxReturnToServerModel,
  MapResponseDataForTaxReturn
} from "../data/TaxReturnMapper";
import { Config } from "@baltimorecounty/javascript-utilities";
const { getValue } = Config;

let exemptionId = 0;

/**
 * Get a lookup value for a given endpoint
 * @param {string} endpoint name of endpoint for lookup values
 */
const GetLookupItem = endpoint =>
  axios
    .get(`${getValue("apiRoot")}/transientTax/${endpoint}`)
    .then(({ status, data }) => (status === 200 ? data : []));

/**
 * Get Exemption Types
 */
const GetExemptionTypes = () => GetLookupItem("exemptionTypes");

/**
 * Get Filing Types
 */
const GetFilingTypes = () => GetLookupItem("filingTypes");

/**
 * Get Transient Tax Return
 */
const GetTransientTaxReturn = confirmationNumber =>
  axios
    .get(
      `${getValue(
        "apiRoot"
      )}/transientTax/return?confirmationnumber=${confirmationNumber}`
    )
    .then(({ status, data }) =>
      status === 200 ? MapResponseDataForTaxReturn(data) : []
    );

/**
 * Get Address Data from GIS
 */
const GetAddresses = location =>
  axios

    .get(`${getValue("apiRoot")}/gis/addressLookup/${location}`)
    .then(({ status, data }) => (status === 200 ? data : []));

/**
 * Verifies if address is in GIS database
 */
const VerifyAddress = location =>
  axios
    .get(`${getValue("apiRoot")}/gis/geocoder/${location}`)
    .then(({ status, data }) => (status === 200 ? data : []));

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
      `${getValue("apiRoot")}/transientTax/return`,
      MapTaxReturnToServerModel(taxReturn)
    )
    .then(({ status, data }) => (status === 200 ? data : []))
    .catch(
      error =>
        console.error(`Something went wrong looking up values: ${error}`) ||
        error
    );

export {
  GetExemptionTypes,
  GetTransientTaxReturn,
  GetAddresses,
  GetFilingTypes,
  SaveExemption,
  VerifyAddress,
  SaveReturn
};
