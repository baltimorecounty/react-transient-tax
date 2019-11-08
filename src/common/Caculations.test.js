import { CalulateInterest, CalculatePenalty } from "./Calculations";

describe("Interest Calculation", () => {
  test("should return the proper calculation when passed valid data based on the default interest rate of 1", () => {
    const actual = CalulateInterest(100, 4);
    expect(actual).toEqual(4);
  });

  test("should return zero if the payment is still considered on time", () => {
    const actual = CalulateInterest(100, 0);
    expect(actual).toEqual(0);
  });
});

describe("Penalty Calculation", () => {
  test("should return the proper penalty based on the default penalty fee of 10%", () => {
    const actual = CalculatePenalty(100);
    expect(actual).toEqual(10);
  });
});
