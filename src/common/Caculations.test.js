import { CalculateInterest, CalculatePenalty, SumTotals } from "./Calculations";

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
});

describe("Sum Totals", () => {
  test("should be precise to two digits ", () => {
    const actual = SumTotals([[9.5], [0.9500000000000001], [0.665]]);
    expect(actual).toEqual([11.12]);
  });
});
