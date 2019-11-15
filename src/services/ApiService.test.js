import { SaveExemption } from "./ApiService";

test("should return an exemption after it is saved", () => {
  const actual = SaveExemption({
    type: 1,
    fromDate: new Date(),
    toDate: new Date()
  });

  expect(actual).toBeTruthy();
});
