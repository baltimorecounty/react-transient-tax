import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SaveExemption, SaveReturn } from "./ApiService";

const buildReturn = (monthlyData = [], exemptions = []) => ({
  accountNumber: "123ABC",
  businessName: "ABC Inc",
  address: "124 Towson Ave, Towson MD 21204",
  dateSubmitted: "0001-01-01T00:00:00",
  returnType: monthlyData.length === 1 ? 2 : 1,
  monthlyData,
  exemptions,
  nameOfSubmitter: "Test Submitter",
  titleOfSubmitter: "Owner",
  tradeAlias: ""
});

const buildMonthlyData = isMonthly => {
  const record = {
    month: 11,
    year: 2019,
    grossRentalCollected: 10.0,
    nonTransientRentalCollected: 10.0,
    governmentExemptRentalCollected: 10.0,
    taxRemitted: 10.0,
    interestRemitted: 10.0,
    penaltyRemitted: 10.0,
    submissionDate: new Date(2019, 12, 12)
  };
  return isMonthly ? [record] : [record, record, record];
};

const buildExemptions = isMonthly => {
  const exemption = {
    StartDate: new Date(2019, 11, 12),
    EndDate: new Date(2019, 11, 12),
    TypeId: 1
  };
  return isMonthly ? [exemption] : [exemption, exemption, exemption];
};

test("should return an exemption after it is saved", () => {
  const actual = SaveExemption({
    type: 1,
    fromDate: new Date(),
    toDate: new Date()
  });

  expect(actual).toBeTruthy();
});

describe("SaveReturn", () => {
  // Mock out all top level functions, such as get, put, delete and post:
  jest.mock("axios");

  test("should save a valid monthly tax return and return a confirmation number", () => {
    const mock = new MockAdapter(axios);
    mock.onPost().reply(200, { ConfirmationNumber: 1 });
    const monthlyTaxReturn = buildReturn(
      buildMonthlyData(true),
      buildExemptions(true)
    );

    SaveReturn(monthlyTaxReturn).then(({ ConfirmationNumber }) => {
      expect(ConfirmationNumber).toEqual(1);
    });
  });

  test("should save a valid quarterly tax return and return a confirmation number", () => {
    const mock = new MockAdapter(axios);
    mock.onPost().reply(200, { ConfirmationNumber: 2 });
    const monthlyTaxReturn = buildReturn(
      buildMonthlyData(false),
      buildExemptions(false)
    );

    SaveReturn(monthlyTaxReturn).then(({ ConfirmationNumber }) => {
      expect(ConfirmationNumber).toEqual(2);
    });
  });
});
