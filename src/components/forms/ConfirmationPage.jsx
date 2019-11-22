import React, { useEffect, useState } from "react";
import { GetFormattedDueDate } from "../../common/DatesUtilities";
import ConfirmationTable from "../ConfirmationTable";
import { GetTransientTaxReturn } from "../../services/ApiService";

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
    dueDate
  } = response;

  useEffect(() => {
    GetTransientTaxReturn(confirmationNumber)
      .then(setResponse)
      .then(() => setIsLoading(false));
  }, [confirmationNumber]);

  const date = new Date();

  const newDueDate = GetFormattedDueDate(
    date.setMonth(date.getMonth() + 1)
  ).toString();

  const labels = {
    ConfirmationHeader: "Your Baltimore County Transient Occupancy Tax Return",
    ConfirmationSubHeader: "Transient Tax Return Submitted",
    ConfirmationBody: `You have successfully completed the Baltimore County Transient Occupancy Tax Return. Your confirmation number for this return is ${confirmationNumber}.`,
    ConfirmationSubBody:
      "Please present this number to the appropriate Budget and Finance Official when making inquiries in regards to your Transient Occupancy Tax Return.",
    ConfirmationNextPayment: `You have signed up for ${ReturnTypeDescription} payments; the due date for your next payment is ${newDueDate}`,
    ConfirmationTaxDetailsHeader: `${confirmationNumber} Transient Occupancy Tax Return Details:`
  };

  const ConfirmationTableValues = [
    { id: 1, key: "Month of Return", value: monthSubmitted },
    { id: 2, key: "Occupancy Tax Collected", value: monthlyOccupancy },
    { id: 3, key: "Exemptions", value: monthlyExemption },
    { id: 4, key: "Penalties", value: monthlyPenalty },
    { id: 5, key: "Monthly Tax Remitted", value: monthlyRemittedTax }
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="tt_form-section">
          <h1>
            <span>{labels.ConfirmationHeader}</span>
          </h1>
          <i>
            <span className="">{DateSubmitted}</span>
          </i>
          <h2>{labels.ConfirmationSubHeader}</h2>
          <p> {labels.ConfirmationBody}</p>
          <p>{labels.ConfirmationSubBody}</p>
          <p>
            <em>{labels.ConfirmationNextPayment}</em>
          </p>
          <ConfirmationTable
            TaxDetailsHeader={labels.ConfirmationTaxDetailsHeader}
            ConfirmationTableValues={ConfirmationTableValues}
            DueDate={dueDate}
            ReturnType={ReturnTypeDescription}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
