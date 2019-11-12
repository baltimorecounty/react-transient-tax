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

const ExemptionTypes = [
  {
    label: "Non-Transient",
    hint: "Sleeping accommodations from 90 consecutive days"
  },
  {
    label: "U.S. Government"
  },
  {
    label: "State of Maryland"
  },
  {
    label: "Baltimore County, MD"
  },
  {
    label: "Other Jurisdictions"
  },
  {
    label: "Foreign Government"
  }
];

export {
  ExemptionTypes,
  Labels,
  RatesAndFees,
  PaymentDirections,
  PaymentInterval
};
