import { PaymentOptions } from "./PaymentOptions";

describe("Payment Options", () => {
  test("should return the proper calculation when passed valid data based on the default interest rate of 1", () => {
    const actual = CalulateInterest(100, 4);
    expect(actual).toEqual(4);
  });

  test("should return zero if the payment is still considered on time", () => {
    const actual = CalulateInterest(100, 0);
    expect(actual).toEqual(0);
  });
});
