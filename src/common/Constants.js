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
    id: 1,
    label: "Non-Transient",
    hint: "Sleeping accommodations from 90 consecutive days"
  },
  {
    id: 2,
    label: "U.S. Government"
  },
  {
    id: 3,
    label: "State of Maryland"
  },
  {
    id: 4,
    label: "Baltimore County, MD"
  },
  {
    id: 5,
    label: "Other Jurisdictions"
  },
  {
    id: 6,
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
