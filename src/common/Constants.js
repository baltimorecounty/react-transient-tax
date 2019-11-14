import { FormatPercentage } from "./FormatUtilities";

const DateTypes = {
  Day: "day",
  Month: "month"
};

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
  TaxInterest: `Interest: Add ${FormatPercentage(
    RatesAndFees.InterestRate
  )} of the Tax Collected each month this return is late`,
  TaxPenalty: `Penalty: Add ${FormatPercentage(
    RatesAndFees.PenaltyRate
  )} of Tax Collected to be added after one month from Due Date`,
  TransientOccupancyTaxRemittedTitle: "Transient Occupancy TaxRemitted",
  TaxCollected: `Tax Collected (Net Room Rental * Transient Occupancy Tax - ${FormatPercentage(
    RatesAndFees.TransientTaxRate
  )})`,
  NetRoomRentalLabel: "Net Room Rental Collections"
};

export { DateTypes, Labels, PaymentDirections, PaymentInterval, RatesAndFees };
