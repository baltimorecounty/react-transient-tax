import React, { useEffect, useState } from "react";
import {
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../../common/DatesUtilities";
import ConfirmationTable from "../ConfirmationTable";
import { GetTransientTaxReturn } from "../../services/ApiService";

const ConfirmationForm = props => {
  const { confirmationNumber = 0 } = props.match.params;
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ReturnTypeDescription, DateSubmitted } = response;

  const datetimeFormat = "MMMM yyyy h:mm aaa";
  const dateFormat = "MMMM yyyy";

  useEffect(() => {
    const mapResponse = response => {
      const { DateSubmitted } = response;
      const formattedResponse = { ...response };
      formattedResponse.DateSubmitted = GetFormatedDateTime(
        new Date(DateSubmitted),
        datetimeFormat
      );
      setResponse(formattedResponse);
    };
    GetTransientTaxReturn(confirmationNumber)
      .then(mapResponse)
      .then(setResponse)
      .then(() => setIsLoading(false));
  }, [confirmationNumber]);

  const { MonthlyData } = response;
  var totalOccupancy = 0;
  var totalExemption = 0;
  var totalPenalty = 0;
  var totalRemittedTax = 0;
  var monthSubmitted = "";

  for (var i = 0; i < MonthlyData.length; i++) {
    totalOccupancy += parseFloat(MonthlyData[i].GrossRentalCollected);
    totalExemption += parseFloat(
      MonthlyData[i].GovernmentExemptRentalCollected
    );
    totalPenalty += parseFloat(MonthlyData[i].PenaltyRemitted);
    totalRemittedTax += parseFloat(MonthlyData[i].TaxRemitted);
    monthSubmitted +=
      GetFormatedDateTime(
        new Date(MonthlyData[i].Month + "/01/" + MonthlyData[i].Year),
        dateFormat
      ) + " ";
  }

  const date = new Date();
  const dueDate = GetFormattedDueDate(date);
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
    { id: 1, key: "Your Payment Plan", value: ReturnTypeDescription },
    { id: 2, key: "Month(s) of Return", value: monthSubmitted },
    { id: 3, key: "Due Date", value: dueDate },
    { id: 4, key: "Occupancy Tax Collected", value: totalOccupancy },
    { id: 5, key: "Exemptions", value: totalExemption },
    { id: 6, key: "Penalties", value: totalPenalty },
    {
      id: 7,
      key: `${ReturnTypeDescription} Tax Remitted`,
      value: totalRemittedTax
    }
  ];

  return (
    <div className="tt_form-section">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
