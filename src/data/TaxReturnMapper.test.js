import { MapTaxReturnToServerModel } from "./TaxReturnMapper";

const monthFormData = {
  accountNumber: "123ABC",
  address: "test",
  businessName: "test",
  email: "test@aol.com",
  monthlyData: [
    {
      month: 1,
      year: 2019,
      grossRentalCollected: 100,
      governmentExemptRentalCollected: -50,
      nonTransientRentalCollected: -75
    }
  ],
  exemptions: [],
  isReturnLate: true,
  monthsLate: 8,
  monthsToReport: { 0: new Date(2019, 0, 1) },
  nameOfSubmitter: "test",
  paymentInterval: "2",
  titleOfSubmitter: "test"
};

const quarterlyFormData = {
  accountNumber: "123ABC",
  address: "test",
  businessName: "test",
  email: "test@aol.com",
  exemptions: [],
  isReturnLate: true,
  monthsLate: 8,
  monthlyData: [
    {
      month: 1,
      year: 2019,
      grossRentalCollected: 100,
      nonTransientRentalCollected: -75,
      governmentExemptRentalCollected: -50
    },
    {
      month: 2,
      year: 2019,
      grossRentalCollected: 200,
      nonTransientRentalCollected: -150,
      governmentExemptRentalCollected: -100
    },
    {
      month: 3,
      year: 2019,
      grossRentalCollected: 400,
      nonTransientRentalCollected: -300,
      governmentExemptRentalCollected: -200
    }
  ],
  monthsToReport: {
    0: new Date(2019, 0, 1),
    1: new Date(2019, 1, 1),
    2: new Date(2019, 2, 1)
  },
  nameOfSubmitter: "test",
  paymentInterval: "1",
  titleOfSubmitter: "test"
};

const exemption = {
  fromDate: new Date(2019, 0, 1),
  id: 1,
  label: "U.S. Government",
  toDate: new Date(2019, 0, 10),
  type: 2
};

describe("MapTaxReturnToServerModel", () => {
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
        returnType: 2,
        monthlyData: [
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

  test("should map form data for a month to the server model with exemptions", () => {
    const monthData = { ...monthFormData, ...{ exemptions: [exemption] } };
    const actual = MapTaxReturnToServerModel(monthData);
    expect(actual).toEqual(
      expect.objectContaining({
        accountNumber: "123ABC",
        address: "test",
        businessName: "test",
        email: "test@aol.com",
        exemptions: [
          {
            startDate: new Date(2019, 0, 1),
            endDate: new Date(2019, 0, 10),
            typeId: 2
          }
        ],
        nameOfSubmitter: "test",
        titleOfSubmitter: "test",
        monthlyData: [
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

  test("should map form data for a quarter to the server model with exemptions", () => {
    const quarterlyData = {
      ...quarterlyFormData,
      ...{ exemptions: [exemption] }
    };
    const actual = MapTaxReturnToServerModel(quarterlyData);
    expect(actual).toEqual(
      expect.objectContaining({
        accountNumber: "123ABC",
        address: "test",
        businessName: "test",
        email: "test@aol.com",
        exemptions: [
          {
            startDate: new Date(2019, 0, 1),
            endDate: new Date(2019, 0, 10),
            typeId: 2
          }
        ],
        nameOfSubmitter: "test",
        titleOfSubmitter: "test",
        monthlyData: [
          {
            month: 1,
            year: 2019,
            grossRentalCollected: 100,
            nonTransientRentalCollected: -75,
            governmentExemptRentalCollected: -50
          },
          {
            month: 2,
            year: 2019,
            grossRentalCollected: 200,
            nonTransientRentalCollected: -150,
            governmentExemptRentalCollected: -100
          },
          {
            month: 3,
            year: 2019,
            grossRentalCollected: 400,
            nonTransientRentalCollected: -300,
            governmentExemptRentalCollected: -200
          }
        ]
      })
    );
  });
});
