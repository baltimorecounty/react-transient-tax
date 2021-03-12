import {
  FormatCurrency,
  ParseAmountToFloat,
  FormatNumber,
  PreserveDecimalFormatNumber
} from "./FormatUtilities";

describe("Format Currency", () => {
  test("should return the proper format for a large currency value", () => {
    const actual = FormatCurrency(1111111.111);
    expect(actual).toEqual("$1,111,111.11");
  });

  test("should return the proper format for a large negative currency value", () => {
    const actual = FormatCurrency(-1111111.111);
    expect(actual).toEqual("-$1,111,111.11");
  });
});

describe("ParseAmountToFloat", () => {
  test("should return the float format for a currency value", () => {
    const actual = ParseAmountToFloat("1,000.54");
    expect(actual).toEqual(1000.54);
  });
});
  describe("FormatNumber", () => {
  test("should return currency format with out decimal for a float value", () => {
    const actual = FormatNumber("1000.");
    expect(actual).toEqual("1,000");
  });
  test("should return currency format with out decimal for a float value", () => {
    const actual = FormatNumber(".54");
    expect(actual).toEqual("54");
  });
});
describe("PreserveDecimalFormatNumber", () => {
  test("should return currency format with decimal for a float value", () => {
    const actual = PreserveDecimalFormatNumber("1000.89");
    expect(actual).toEqual("1,000.89");
  });
});
