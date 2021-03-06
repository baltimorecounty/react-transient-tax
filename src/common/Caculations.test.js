import {
  CalculateInterest,
  CalculatePenalty,
  GetCalculatedTotals,
  SumTotals
} from "./Calculations";

describe("Interest Calculation", () => {
  test("should return the proper calculation when passed valid data based on the default interest rate of 1", () => {
    const actual = CalculateInterest(10000, 2, 0.01);
    expect(actual).toEqual(200);
  });

  test("should return zero if the payment is still considered on time", () => {
    const actual = CalculateInterest(100, 0, 0.1);
    expect(actual).toEqual(0);
  });
});

describe("Penalty Calculation", () => {
  test("should return the proper penalty based on the default penalty fee of 10%", () => {
    const actual = CalculatePenalty(100);
    expect(actual).toEqual(10);
  });

  test("should return the proper penalty based on the manually specified penalty fee", () => {
    const actual = CalculatePenalty(100, 0.095);
    expect(actual).toEqual(9.5);
  });
});

describe("Get Calculated Totals", () => {
  test("should get the proper totals for a return with no exemptions and paid before past due.", () => {
    const fields = {
      grossRentalCollected: 100,
      nonTransientRentalCollected: 0,
      governmentExemptRentalCollected: 0
    };

    const {
      totalExemptions,
      netRoomRentalCollections,
      transientTaxCollected,
      transientInterest,
      transientPenalty,
      totalInterestAndPenalties,
      monthlyTaxRemitted
    } = GetCalculatedTotals({
      fields,
      monthsLate: 0,
      taxRate: 0.095,
      interestRate: 0.01,
      penaltyRate: 0.1
    });

    expect(totalExemptions).toEqual(0);
    expect(netRoomRentalCollections).toEqual(100);
    expect(transientTaxCollected).toEqual(9.5);
    expect(transientInterest).toEqual(0);
    expect(transientPenalty).toEqual(0);
    expect(totalInterestAndPenalties).toEqual(0);
    expect(monthlyTaxRemitted).toEqual(9.5);
  });
  
describe("Get Calculated Totals", () => {
  test("should get the proper totals for a return with no exemptions with past due.", () => {
    const fields = {
      grossRentalCollected: 100,
      nonTransientRentalCollected: 0,
      governmentExemptRentalCollected: 0
    };

    const {
      totalExemptions,
      netRoomRentalCollections,
      transientTaxCollected,
      transientInterest,
      transientPenalty,
      totalInterestAndPenalties,
      monthlyTaxRemitted
    } = GetCalculatedTotals({
      fields,
      monthsLate: 1,
      taxRate: 0.095,
      interestRate: 0.01,
      penaltyRate: 0.1
    });

    expect(totalExemptions).toEqual(0);
    expect(netRoomRentalCollections).toEqual(100);
    expect(transientTaxCollected).toEqual(9.5);
    expect(transientInterest).toEqual(0.1);
    expect(transientPenalty).toEqual(0);
    expect(totalInterestAndPenalties).toEqual(0.1);
    expect(monthlyTaxRemitted).toEqual(9.6);
  });
});
  test("should get the proper totals for a return with no exemptions and paid late.", () => {
    const fields = {
      grossRentalCollected: 100,
      nonTransientRentalCollected: 0,
      governmentExemptRentalCollected: 0
    };

    const {
      totalExemptions,
      netRoomRentalCollections,
      transientTaxCollected,
      transientInterest,
      transientPenalty,
      totalInterestAndPenalties,
      monthlyTaxRemitted
    } = GetCalculatedTotals({
      fields,
      monthsLate: 8,
      taxRate: 0.095,
      interestRate: 0.01,
      penaltyRate: 0.1
    });

    expect(totalExemptions).toEqual(0);
    expect(netRoomRentalCollections).toEqual(100);
    expect(transientTaxCollected).toEqual(9.5);
    expect(transientInterest).toEqual(0.76);
    expect(transientPenalty).toBeCloseTo(0.95, 5);
    expect(totalInterestAndPenalties).toEqual(1.71);
    expect(monthlyTaxRemitted).toEqual(11.21);
  });

  test("should get the proper totals for a return with with exemptions and paid before past due.", () => {
    const fields = {
      grossRentalCollected: 120,
      nonTransientRentalCollected: -10,
      governmentExemptRentalCollected: -10
    };

    const {
      totalExemptions,
      netRoomRentalCollections,
      transientTaxCollected,
      transientInterest,
      transientPenalty,
      totalInterestAndPenalties,
      monthlyTaxRemitted
    } = GetCalculatedTotals({
      fields,
      monthsLate: 0,
      taxRate: 0.095,
      interestRate: 0.01,
      penaltyRate: 0.1
    });

    expect(totalExemptions).toEqual(-20);
    expect(netRoomRentalCollections).toEqual(100);
    expect(transientTaxCollected).toEqual(9.5);
    expect(transientInterest).toEqual(0);
    expect(transientPenalty).toEqual(0);
    expect(totalInterestAndPenalties).toEqual(0);
    expect(monthlyTaxRemitted).toEqual(9.5);
  });

  test("should get the proper totals for a return with with exemptions and paid late.", () => {
    const fields = {
      grossRentalCollected: 120,
      nonTransientRentalCollected: -10,
      governmentExemptRentalCollected: -10
    };

    const {
      totalExemptions,
      netRoomRentalCollections,
      transientTaxCollected,
      transientInterest,
      transientPenalty,
      totalInterestAndPenalties,
      monthlyTaxRemitted
    } = GetCalculatedTotals({
      fields,
      monthsLate: 8,
      taxRate: 0.095,
      interestRate: 0.01,
      penaltyRate: 0.1
    });

    expect(totalExemptions).toEqual(-20);
    expect(netRoomRentalCollections).toEqual(100);
    expect(transientTaxCollected).toEqual(9.5);
    expect(transientInterest).toEqual(0.76);
    expect(transientPenalty).toBeCloseTo(0.95, 5);
    expect(totalInterestAndPenalties).toEqual(1.71);
    expect(monthlyTaxRemitted).toEqual(11.21);
  });
});

describe("Sum Totals", () => {
  test("should be precise to two digits ", () => {
    const actual = SumTotals([[9.5], [0.9500000000000001], [0.665]]);
    expect(actual).toEqual([11.12]);
  });
});
