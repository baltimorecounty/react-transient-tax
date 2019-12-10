import {
  GetFormattedDueDate,
  GetFormatedDateTime,
  GetDueDateStatus
} from "../common/DatesUtilities";
import { FormatCurrency } from "../common/FormatUtilities";
import {
  CalculatePenalty,
  CalculateInterest,
  CalculateTaxCollected
} from "../common/Calculations";

/**
 * Maps Transient Tax Form Data to the confirmation page
 * @param {object} taxReturn tax return form data model
 */
const MapResponseDataForTaxReturn = taxReturn => {
  const dateFormat = "MMMM yyyy";
  const { DateSubmitted, MonthlyData } = taxReturn;

  const formattedResponse = { ...taxReturn };
  formattedResponse.DateSubmitted = GetFormatedDateTime(
    new Date(DateSubmitted),
    "MMMM dd yyyy"
  );
  let monthlyOccupancy = [];
  let monthlyExemption = [];
  let monthlyPenalty = [];
  let monthlyRemittedTax = [];
  let monthSubmitted = [];
  let monthlyInterest = [];
  let monthlyTaxCollected = [];
  let monthlyNetRoomRental = [];

  let totalMonthlyOccupancy = 0;
  let totalMonthlyExemption = 0;
  let totalMonthlyPenalty = 0;
  let totalMonthlyRemittedTax = 0;
  let totalMonthlyInterest = 0;
  let totalMonthlyTaxCollected = 0;
  let totalMonthlyNetRoomRental = 0;

  const isMonthly = Object.keys(MonthlyData).length === 1;
  const monthOfReturn = isMonthly ? 0 : 2;
  const dueDate = new Date(
    MonthlyData[monthOfReturn].Month + "/01/" + MonthlyData[monthOfReturn].Year
  );
  const formattedDueDate = GetFormattedDueDate(dueDate);
  const { isLate, value: monthsLate } = GetDueDateStatus(
    dueDate,
    new Date(DateSubmitted)
  );

  for (var i = 0; i < MonthlyData.length; i++) {
    const {
      GrossRentalCollected,
      GovernmentExemptRentalCollected,
      NonTransientRentalCollected,
      Year,
      Month
    } = MonthlyData[i];

    monthlyOccupancy = monthlyOccupancy.concat(
      FormatCurrency(GrossRentalCollected)
    );
    totalMonthlyOccupancy += GrossRentalCollected;

    monthlyExemption = monthlyExemption.concat(
      FormatCurrency(
        parseFloat(GovernmentExemptRentalCollected) +
          parseFloat(NonTransientRentalCollected)
      )
    );
    totalMonthlyExemption +=
      parseFloat(GovernmentExemptRentalCollected) +
      parseFloat(NonTransientRentalCollected);

    const netRoomRentalsForMonth =
      GrossRentalCollected +
      GovernmentExemptRentalCollected +
      NonTransientRentalCollected;
    const taxCollectedForMonth = CalculateTaxCollected(netRoomRentalsForMonth);
    const interestForMonth = isLate
      ? CalculateInterest(taxCollectedForMonth, monthsLate)
      : 0;
    const penaltyForMonth = isLate ? CalculatePenalty(taxCollectedForMonth) : 0;

    totalMonthlyPenalty += penaltyForMonth;

    monthlyPenalty.push(FormatCurrency(totalMonthlyPenalty));

    totalMonthlyInterest += interestForMonth;

    monthlyInterest.push(FormatCurrency(interestForMonth));

    totalMonthlyTaxCollected += taxCollectedForMonth;

    monthlyTaxCollected.push(FormatCurrency(taxCollectedForMonth));

    totalMonthlyNetRoomRental += netRoomRentalsForMonth;

    monthlyNetRoomRental.push(FormatCurrency(netRoomRentalsForMonth));

    // Right now the api is not return a value for TaxRemitted, so we need to calculate this.
    const taxRemittedForMonth =
      taxCollectedForMonth + penaltyForMonth + interestForMonth;

    monthlyRemittedTax = monthlyRemittedTax.concat(
      FormatCurrency(taxRemittedForMonth)
    );

    totalMonthlyRemittedTax += taxRemittedForMonth;

    monthSubmitted = monthSubmitted.concat(
      GetFormatedDateTime(new Date(Month + "/01/" + Year), dateFormat) + " "
    );
  }

  if (!isMonthly) {
    monthlyOccupancy.push(FormatCurrency(totalMonthlyOccupancy));
    monthlyExemption.push(FormatCurrency(totalMonthlyExemption));
    monthlyNetRoomRental.push(FormatCurrency(totalMonthlyNetRoomRental));
    monthlyInterest.push(FormatCurrency(totalMonthlyInterest));
    monthlyPenalty.push(FormatCurrency(totalMonthlyPenalty));
    monthlyRemittedTax.push(FormatCurrency(totalMonthlyRemittedTax));
    monthlyTaxCollected.push(FormatCurrency(totalMonthlyTaxCollected));
    monthSubmitted = monthSubmitted.concat("Total");
  }

  formattedResponse.monthlyOccupancy = monthlyOccupancy;
  formattedResponse.monthlyExemption = monthlyExemption;
  formattedResponse.monthlyNetRoomRental = monthlyNetRoomRental;
  formattedResponse.monthlyTaxCollected = monthlyTaxCollected;
  formattedResponse.monthlyPenalty = monthlyPenalty;
  formattedResponse.monthlyInterest = monthlyInterest;
  formattedResponse.monthlyRemittedTax = monthlyRemittedTax;
  formattedResponse.monthSubmitted = monthSubmitted;
  formattedResponse.dueDate = dueDate;
  formattedResponse.formattedDueDate = formattedDueDate;

  return formattedResponse;
};

/**
 * Map exemptions to the Server Model
 * @param {Array} exemptions
 */
const MapExemptionsToServerModel = (exemptions = []) =>
  exemptions.map(({ fromDate: startDate, toDate: endDate, type: typeId }) => ({
    startDate,
    endDate,
    typeId
  }));

/**
 * Map Transient Tax Form Data to Transient Tax Return Server Model for POSTing the data.
 * @param {object} taxReturn transient tax form data
 */
const MapTaxReturnToServerModel = taxReturn => {
  const { exemptions, paymentInterval = 0 } = taxReturn;
  const mappedExemptions = MapExemptionsToServerModel(exemptions);
  return {
    ...taxReturn,
    ...{ exemptions: mappedExemptions },
    ...{ returnType: parseInt(paymentInterval) }
  };
};

export { MapResponseDataForTaxReturn, MapTaxReturnToServerModel };
