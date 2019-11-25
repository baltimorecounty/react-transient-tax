import React, { useEffect, useState } from "react";
import { GetFormattedDueDate } from "../common/DatesUtilities";
import ConfirmationTable from "../components/ConfirmationTable";
import { GetTransientTaxReturn } from "../services/ApiService";
import { addMonths } from "date-fns";

const ConfirmationForm = props => {
  const { confirmationNumber = 0 } = props.match.params;
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    ReturnTypeDescription,
    DateSubmitted,
    monthlyOccupancy,
    monthlyExemption,
    monthlyPenalty,
    monthlyRemittedTax,
    monthSubmitted,
    monthlyTaxCollected,
    monthlyInterest,
    monthlyNetRoomRental,
    dueDate
  } = response;

  useEffect(() => {
    GetTransientTaxReturn(confirmationNumber)
      .then(response => {
        setResponse(response);
        setIsLoading(false);
      })
      .catch(error => {
        props.history.push("/error", { ...error });
      });
  }, [confirmationNumber]);

  const newDueDate = monthlyInterest
    ? GetFormattedDueDate(
        addMonths(new Date(dueDate), monthlyInterest.length)
      ).toString()
    : null;

  const ConfirmationTableValues = [
    { id: 1, key: "Month of Return", value: monthSubmitted },
    { id: 2, key: "Occupancy Tax Collected", value: monthlyOccupancy },
    { id: 3, key: "Exemptions", value: monthlyExemption },
    { id: 4, key: "Net Room Rental Collections", value: monthlyNetRoomRental },
    { id: 5, key: "Tax Collected", value: monthlyTaxCollected },
    { id: 6, key: "Interest", value: monthlyInterest },
    { id: 7, key: "Penalties", value: monthlyPenalty },
    { id: 8, key: "Monthly Tax Remitted", value: monthlyRemittedTax }
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
          <p>
            <em>
              You have signed up for {ReturnTypeDescription.toLowerCase()}{" "}
              payments the due date for your next payment is {newDueDate}
            </em>
          </p>
          <ConfirmationTable
            TaxDetailsHeader={"Transient Occupancy Tax Return Details:"}
            ConfirmationTableValues={ConfirmationTableValues}
            DateSubmitted={DateSubmitted}
            DueDate={dueDate}
            ReturnType={ReturnTypeDescription}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
