import React, { useEffect, useState } from "react";
import {
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../../common/DatesUtilities";
import ConfirmationTable from "../ConfirmationTable";
import { GetTransientTaxReturn } from "../../services/ApiService";
import { connect } from "formik";

const ConfirmationForm = props => {
  const { confirmationNumber = 0 } = props.match.params;
  const [response, setResponse] = useState([]);
  const dateFormat = "MMMM yyyy";
  const timeFormat = "h:mm aaa";

  useEffect(() => {
    const mapResponse = response => {
      const { DateSubmitted } = response;
      const formattedResponse = { ...response };
      formattedResponse.DateSubmitted = GetFormatedDateTime(
        DateSubmitted,
        dateFormat
      );
      return formattedResponse;
    };
    GetTransientTaxReturn(confirmationNumber)
      .then(mapResponse)
      .then(setResponse);
  }, [confirmationNumber, props, setResponse]);

  const ReturnTypeDescription = response.ReturnTypeDescription;

  const GetTotalOccupancyTaxCollected = () => {
    const months = response.MonthlyData;
    var total = 0;
    for (var i = 0; i < months.length; i++) {
      total += parseFloat(months[i].grossRentalCollected);
    }
    return total;
  };

  //const occupancyTaxCollected = GetTotalOccupancyTaxCollected(); //response.data.TaxCollected;
  const taxRemitted = "$36.15"; //response.data.TaxRemitted;
  const exemptionTotal = "$0.00"; //response.data.ExemptionTotal;
  const penaltyTotal = "$6.15"; //response.data.PenaltyTotal;

  //const dateToday = GetFormatedDateTime(DateSubmitted, dateFormat);
  const timeToday = GetFormatedDateTime(new Date(), timeFormat);
  const newDueDate = GetFormattedDueDate(new Date()).toString();

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
    //{ id: 2, key: "Month(s) of Return", value: dateToday },
    { id: 3, key: "Due Date", value: newDueDate },
    //{ id: 4, key: "Occupancy Tax Collected", value: occupancyTaxCollected },
    { id: 5, key: "Exemptions", value: exemptionTotal },
    { id: 6, key: "Penalties", value: penaltyTotal },
    { id: 7, key: `${ReturnTypeDescription} Tax Remitted`, value: taxRemitted }
  ];

  return (
    <div className="tt_form-section">
      <div>
        <a name="Skip"></a>
      </div>
      <h1>
        <span>{labels.ConfirmationHeader}</span>
      </h1>
      <i>
        {/* <span className="">{dateToday} </span> */}
        <span className="">{timeToday}</span>
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
  );
};

export default connect(ConfirmationForm);
