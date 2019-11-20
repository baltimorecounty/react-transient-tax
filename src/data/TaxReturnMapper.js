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
    // submissionDate: "0001-01-01T00:00:00"
  };
};

const MapTaxReturnToServerModel = taxReturn => {
  const { monthsToReport } = taxReturn;
  const monthData = Object.keys(monthsToReport).map(monthKey =>
    GetDataForMonth(taxReturn, monthKey)
  );
  return { ...taxReturn, monthData };
};

export { GetDataForMonth, MapTaxReturnToServerModel };
