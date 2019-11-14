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
  InterestRate: 0.01, // 1%
  TransientTaxRate: 0.095 // 9.5%
};

const Labels = {
  Question:"Why do we need this?",
  LegalNote:"I Declare under penalty of perjury that this return has been examined by me and to the best of my knowledge and belief is a true, correct and complete return.",
  GrossOccupancy: "Gross Occupancy Tax Collected",
  DaysRemaining: "Days remaining until due",
  DueDate: "Due Date",
  PastDue: "Past Due",
  ExemptionTitle: "Exemptions",
  ExemptionOption1:
    "Room Rental Collection from Not Transients (Accommodations from more than 90 days)",
  ExemptionOption2:
    "Federal, State or County official or employee when on official business",
  ExemptionTotal: "Total Exemptions",
  TransientOccupancyTaxRemittedTitle: "Transient Occupancy TaxRemitted",
  TaxCollected: `Tax Collected (Net Room Rental * Transient Occupancy Tax - ${RatesAndFees.TransientTaxRate *
    100}%)`,
  NetRoomRentalLabel: "Net Room Rental Collections"
};

export { Labels, PaymentDirections, PaymentInterval, RatesAndFees };
