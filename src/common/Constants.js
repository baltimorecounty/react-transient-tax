const PaymentInterval = {
  Monthly: 2,
  Quarterly: 1
};

const PaymentDirections = {
  PaymentLabel: "Do you file your return....",
  PaymentNote:
    "Note: Must select the interval in which you have selected previously unless it's a new year."
};

const RatesAndFees = {
  PenaltyRate: 0.1, // 10%
  InterestRate: 0.01 // 1%
};

const Labels = {
  DueDate: "Due Date",
  PastDue: "Past Due",
  DaysRemaining: "Days remaining until due"
};

export { Labels, RatesAndFees, PaymentDirections, PaymentInterval };
