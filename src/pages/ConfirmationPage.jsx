import React, { useEffect, useState } from "react";
import ReturnSummary from "../components/ReturnSummary";
import { BudgetAndFinanceOfficeAddress } from "../common/Constants";
import { ErrorPath } from "../common/ErrorUtility";
import Address from "../components/Address";
import { GetTransientTaxReturn } from "../services/ApiService";
import { FormatCurrency } from "../common/FormatUtilities";

const {
  Organization,
  Department,
  City,
  Street
} = BudgetAndFinanceOfficeAddress;
const ConfirmationForm = props => {
  const { confirmationNumber = 0 } = props.match.params;
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    ReturnTypeDescription,
    DateSubmitted,
    occupancyTaxCollected,
    exemptions,
    netRoomRentals,
    taxCollected,
    penaltiesCollected,
    interestCollected,
    taxRemitted,
    monthsSubmitted,
    dueDate,
    formattedDueDate
  } = response;

  useEffect(() => {
    GetTransientTaxReturn(confirmationNumber)
      .then(response => {
        setResponse(response);
        setIsLoading(false);
      })
      .catch(error => {
        props.history.push(ErrorPath(error), { ...error });
      });
  }, [confirmationNumber, props.history]);

  const ConfirmationTableValues = [
    { id: 1, key: "Month of Return", value: monthsSubmitted },
    {
      id: 2,
      key: "Occupancy Tax Collected",
      value: occupancyTaxCollected,
      formatFn: FormatCurrency
    },
    { id: 3, key: "Exemptions", value: exemptions, formatFn: FormatCurrency },
    {
      id: 4,
      key: "Net Room Rental Collections",
      value: netRoomRentals,
      formatFn: FormatCurrency
    },
    {
      id: 5,
      key: "Tax Collected",
      value: taxCollected,
      formatFn: FormatCurrency
    },
    {
      id: 6,
      key: "Interest",
      value: interestCollected,
      formatFn: FormatCurrency
    },
    {
      id: 7,
      key: "Penalties",
      value: penaltiesCollected,
      formatFn: FormatCurrency
    },
    {
      id: 8,
      key: "Monthly Tax Remitted",
      value: taxRemitted,
      formatFn: FormatCurrency
    }
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="tt_form-section">
          <h1>
            <span>Your Baltimore County Transient Occupancy Tax Return</span>
          </h1>
          <h2>Transient Tax Return Submitted</h2>
          <h3>Confirmation Number: {confirmationNumber}</h3>
          <p>
            You have successfully completed the Baltimore County Transient
            Occupancy Tax Return. Your confirmation number for this return is{" "}
            <strong>{confirmationNumber}</strong>.
          </p>
          <p>
            Please present this number to the appropriate Budget and Finance
            Official when making inquiries in regards to your Transient
            Occupancy Tax Return.
          </p>
          <ReturnSummary
            header={"Transient Occupancy Tax Return Details:"}
            values={ConfirmationTableValues}
            dateSubmitted={DateSubmitted}
            dueDate={formattedDueDate}
            returnType={ReturnTypeDescription}
          />
          <Address
            line1={Organization}
            line2={Department}
            street={Street}
            city={City}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
