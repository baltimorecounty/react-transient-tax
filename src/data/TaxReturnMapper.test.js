import { GetDataForMonth, MapTaxReturnToServerModel } from "./TaxReturnMapper";

const monthFormData = {
  accountNumber: "123ABC",
  address: "test",
  businessName: "test",
  email: "test@aol.com",
  exemptions: [],
  governmentOnBusiness: { 0: -50 },
  grossOccupancy: { 0: 100 },
  isReturnLate: true,
  monthsLate: 8,
  monthsToReport: { 0: new Date(2019, 0, 1) },
  nameOfSubmitter: "test",
  paymentInterval: "2",
  roomRentalCollectionFromNonTransients: { 0: -75 },
  titleOfSubmitter: "test"
};

const quarterlyFormData = {
  accountNumber: "123ABC",
  address: "test",
  businessName: "test",
  email: "test@aol.com",
  exemptions: [],
  governmentOnBusiness: { 0: -50, 1: -100, 2: -200 },
  grossOccupancy: { 0: 100, 1: 200, 2: 400 },
  isReturnLate: true,
  monthsLate: 8,
  monthsToReport: {
    0: new Date(2019, 0, 1),
    1: new Date(2019, 1, 1),
    2: new Date(2019, 2, 1)
  },
  nameOfSubmitter: "test",
  paymentInterval: "2",
  roomRentalCollectionFromNonTransients: { 0: -75, 1: -150, 2: -300 },
  titleOfSubmitter: "test"
};

describe("GetDataForMonth", () => {
  test("should return proper data for the first item monthly return", () => {
    const actual = GetDataForMonth(monthFormData, 0);

    expect(actual).toEqual({
      month: 1,
      year: 2019,
      grossRentalCollected: 100,
      nonTransientRentalCollected: -75,
      governmentExemptRentalCollected: -50
    });
  });

  test("should return proper data for the last item quarterly return", () => {
    const actual = GetDataForMonth(quarterlyFormData, 2);

    expect(actual).toEqual({
      month: 3,
      year: 2019,
      grossRentalCollected: 400,
      nonTransientRentalCollected: -300,
      governmentExemptRentalCollected: -200
    });
  });
});

test("should map form data for a month to the server model without exemptions", () => {
  const actual = MapTaxReturnToServerModel(monthFormData);
  expect(actual).toEqual(
    expect.objectContaining({
      accountNumber: "123ABC",
      address: "test",
      businessName: "test",
      email: "test@aol.com",
      exemptions: [],
      nameOfSubmitter: "test",
      titleOfSubmitter: "test",
      monthData: [
        {
          month: 1,
          year: 2019,
          grossRentalCollected: 100,
          nonTransientRentalCollected: -75,
          governmentExemptRentalCollected: -50
        }
      ]
    })
  );
});

test("should map form data for a month to the server model with exemptions", () => {});

// test("should map form data for a quarter to the server model without exemptions", () => {});

// test("should map form data for a quarter to the server model with exemptions", () => {});
