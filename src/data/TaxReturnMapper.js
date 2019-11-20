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
    grossRentalCollected: grossOccupancy[monthIndex],
    nonTransientRentalCollected:
      roomRentalCollectionFromNonTransients[monthIndex],
    governmentExemptRentalCollected: governmentOnBusiness[monthIndex]
    /** TODO: These are all calculated, so I'm assuming we don't send these over? */
    // taxRemitted: 0.0,
    // interestRemitted: 0.0,
    // penaltyRemitted: 0.0,
  };
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
  const { monthsToReport, exemptions } = taxReturn;
  const monthData = Object.keys(monthsToReport).map(monthKey =>
    GetDataForMonth(taxReturn, monthKey)
  );
  const mappedExemptions = MapExemptionsToServerModel(exemptions);
  return { ...taxReturn, monthData, ...{ exemptions: mappedExemptions } };
};

export { GetDataForMonth, MapTaxReturnToServerModel };
