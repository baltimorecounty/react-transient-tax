export const PaymentToggle = [
  { key: "FirstToggleOption", value: "1" },
  { key: "SecondToggleOption", value: "2" },
  { key: "FirstToggleOptionText", value: "Monthly" },
  { key: "SecondToggleOptionText", value: "Quarterly" }
];

export const PaymentDirections = [
  { key: "Label", value: "Do you file your return...." },
  {
    key: "Note",
    value:
      "Note: Must select the interval in which you have selected previously unless it's a new year."
  }
];

export default PaymentToggle;

const RatesAndFees = {
  PenaltyRate: 0.1, // 10%
  InterestRate: 0.01 // 1%
};

export { RatesAndFees };
