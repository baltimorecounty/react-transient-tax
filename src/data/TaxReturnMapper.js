import {
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../common/DatesUtilities";
import { FormatCurrency } from "../common/FormatUtilities";

/**
 * Maps Transient Tax Form Data to the Server Model
 * @param {object} taxReturn tax return form data model
 * @param {number} monthIndex index of month of the data to return
 */
const GetDataForMonth = (taxReturn, monthIndex) => {
  const {
    monthsToReport,
    grossOccupancy,
    governmentOnBusiness,
    roomRentalCollectionFromNonTransients
  } = taxReturn;
  const returnDate = monthsToReport[monthIndex];

  return {
    /** month is 0 based so 11 = December but server is not 0 based */
    month: returnDate.getMonth() + 1,
    year: returnDate.getFullYear(),
    grossRentalCollected: grossOccupancy[monthIndex] || 0,
    nonTransientRentalCollected:
      roomRentalCollectionFromNonTransients[monthIndex] || 0,
    governmentExemptRentalCollected: governmentOnBusiness[monthIndex] || 0
  };
};

/**
 * Maps Transient Tax Form Data to the confirmation page
 * @param {object} taxReturn tax return form data model
 */
const MapResponseDataForTaxReturn = taxReturn => {
  const dateTimeFormat = "MMMM yyyy h:mm aaa";
  const dateFormat = "MMMM yyyy";
  const { DateSubmitted, MonthlyData } = taxReturn;
  const formattedResponse = { ...taxReturn };
  formattedResponse.DateSubmitted = GetFormatedDateTime(
    new Date(DateSubmitted),
    dateTimeFormat
  );
  var monthlyOccupancy = [];
  var monthlyExemption = [];
  var monthlyPenalty = [];
  var monthlyRemittedTax = [];
  var monthSubmitted = [];

  var totalMonthlyOccupancy = 0;
  var totalMonthlyExemption = 0;
  var totalMonthlyPenalty = 0;
  var totalMonthlyRemittedTax = 0;

  for (var i = 0; i < MonthlyData.length; i++) {
    monthlyOccupancy = monthlyOccupancy.concat(
      FormatCurrency(MonthlyData[i].GrossRentalCollected)
    );
    totalMonthlyOccupancy += parseFloat(MonthlyData[i].GrossRentalCollected);

    monthlyExemption = monthlyExemption.concat(
      FormatCurrency(
        parseFloat(MonthlyData[i].GovernmentExemptRentalCollected) +
          parseFloat(MonthlyData[i].NonTransientRentalCollected)
      )
    );
    totalMonthlyExemption +=
      parseFloat(MonthlyData[i].GovernmentExemptRentalCollected) +
      parseFloat(MonthlyData[i].NonTransientRentalCollected);

    monthlyPenalty = monthlyPenalty.concat(
      FormatCurrency(MonthlyData[i].PenaltyRemitted)
    );
    totalMonthlyPenalty += parseFloat(MonthlyData[i].PenaltyRemitted);

    monthlyRemittedTax = monthlyRemittedTax.concat(
      FormatCurrency(MonthlyData[i].TaxRemitted)
    );
    totalMonthlyRemittedTax += parseFloat(MonthlyData[i].TaxRemitted);

    monthSubmitted = monthSubmitted.concat(
      GetFormatedDateTime(
        new Date(MonthlyData[i].Month + "/01/" + MonthlyData[i].Year),
        dateFormat
      ) + " "
    );
  }

  const isMonthly = Object.keys(MonthlyData).length === 1;

  if (!isMonthly) {
    monthlyOccupancy.push(FormatCurrency(totalMonthlyOccupancy));
    monthlyExemption.push(FormatCurrency(totalMonthlyExemption));
    monthlyPenalty.push(FormatCurrency(totalMonthlyPenalty));
    monthlyRemittedTax.push(FormatCurrency(totalMonthlyRemittedTax));
    monthSubmitted = monthSubmitted.concat("Total");
  }

  const monthOfReturn = isMonthly ? 0 : 2;

  const dueDate = GetFormattedDueDate(
    new Date(
      MonthlyData[monthOfReturn].Month +
        "/01/" +
        MonthlyData[monthOfReturn].Year
    )
  );

  formattedResponse.monthlyOccupancy = monthlyOccupancy;
  formattedResponse.monthlyExemption = monthlyExemption;
  formattedResponse.monthlyPenalty = monthlyPenalty;
  formattedResponse.monthlyRemittedTax = monthlyRemittedTax;
  formattedResponse.monthSubmitted = monthSubmitted;
  formattedResponse.dueDate = dueDate;

  return formattedResponse;
};

/**
 * Map exemptions to the Server Model
 * @param {Array} exemptions
 */
const MapExemptionsToServerModel = exemptions =>
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
  const { monthsToReport, exemptions, paymentInterval = 0 } = taxReturn;
  const monthlyData = Object.keys(monthsToReport).map(monthKey =>
    GetDataForMonth(taxReturn, monthKey)
  );
  const mappedExemptions = MapExemptionsToServerModel(exemptions);
  return {
    ...taxReturn,
    monthlyData,
    ...{ exemptions: mappedExemptions },
    ...{ returnType: parseInt(paymentInterval) }
  };
};

export {
  GetDataForMonth,
  MapResponseDataForTaxReturn,
  MapTaxReturnToServerModel
};
