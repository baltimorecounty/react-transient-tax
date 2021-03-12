import { FormatPercentage } from "./FormatUtilities";

const DateTypes = {
  Day: "day",
  Month: "month"
};

const FormHints = {
  NonTransient: "Sleeping accommodations for 90 consecutive days"
};
const IEMessage = {
  IEMessageLabel:
    "Internet Explorer may not work correctly for this site. Please use Chrome or Edge for the best browsing experience"
};

const PaymentDirections = {
  PaymentLabel: "Do you file your return....",
  PaymentNote:
    "Note: Must select the interval which you selected previously unless it's a new year."
};
const BudgetAndFinanceOfficeAddress = {
  Organization: "BALTIMORE COUNTY MARYLAND",
  Department: "Office of Budget and Finance",
  Street: "400 Washington Avenue, Room 150",
  City: "Towson, Maryland 21204-4665"
};

const RatesAndFees = {
  PenaltyRate: 0.1, // 10%
  InterestRate: 0.01, // 1%
  TransientTaxRate: 0.095 // 9.5%
};

const Labels = {
  InterestDisclaimer:
    "Interest calculation above is based on the current date. If your payment is not postmarked in the current month you will be assessed additional interest.",
  WhyDoWeNeedThis: "Why do we need this?",
  LegalNote:
    "I Declare under penalty of perjury that this return has been examined by me and to the best of my knowledge and belief is a true, correct and complete return.",
  GrossOccupancy:
    "Gross Occupancy Revenue Collected" /** field name "grossRentalCollected" */,
  DaysRemaining: "Days remaining until due",
  DueDate: "Due Date",
  PastDue: "Past Due",
  ExemptionTitle: "Exemptions",
  ExemptionOption2:
    "Federal, State or County official or employee when on official business",
  ExemptionTotal: "Total Exemptions",
  MonthlyTaxRemitted: "Monthly Tax Amount Remitted",

  TransientOccupancyTaxRemittedTitle: "Transient Occupancy Tax Remitted",

  NetRoomRentalLabel: "Net Room Rental Collections",
  PenaltyInterestTotal: "Total Interest and Penalties"
};

const LabelsWithNotes = {
  NonTransientsRentalCollected: {
    label: "Room Rental Collections from Non Transients",
    note: " (Accommodations for more than 90 days)"
  },
  TaxInterest: {
    label: "Interest",
    note: `: Add ${FormatPercentage(
      RatesAndFees.InterestRate
    )} of the Tax Collected each month this return is late`
  },
  TaxCollected: {
    label: "Tax Collected",
    note: ` (Net Room Rental * Transient Occupancy Tax @ ${FormatPercentage(
      RatesAndFees.TransientTaxRate
    )})`
  },
  TaxPenalty: {
    label: "Penalty",
    note: `: Add ${FormatPercentage(
      RatesAndFees.PenaltyRate
    )} of Tax Collected to be added after one month from Due Date`
  }
};

const Messages = {
  ExemptionCertificate: {
    Certification:
      "I certify that the occupancy of the facilities above have been (or will be) furnished for the exclusive use of and will be paid by or from the funds of:",
    Qualification:
      "That all of the qualifications explained on this form have been met so as to exempt this occupancy from the tax imposed by County Code 11-4-401."
  }
};

export {
  DateTypes,
   IEMessage,
  FormHints,
  Labels,
  LabelsWithNotes,
  Messages,
  PaymentDirections,
  RatesAndFees,
  BudgetAndFinanceOfficeAddress
};
