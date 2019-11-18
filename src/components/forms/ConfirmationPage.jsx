import React from "react";
import {
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../../common/DatesUtilities";
import ConfirmationTable from "../ConfirmationTable";
import { connect } from "formik";

const ConfirmationForm = props => {
  const response = props.history.location.state;

  /**************values coming from API currently hard coded for display********/
  const confirmationId = "0924276246"; //response.data.ConfirmationID;
  const paymentInterval = "Monthly"; //response.data.Interval;
  const occupancyTaxCollected = "$30.00"; //response.data.TaxCollected;
  const taxRemitted = "$36.15"; //response.data.TaxRemitted;
  const exemptionTotal = "$0.00"; //response.data.ExemptionTotal;
  const penaltyTotal = "$6.15"; //response.data.PenaltyTotal;
  /****************************************************************************/

  const dateFormat = "MMMM yyyy";
  const timeFormat = "h:mm aaa";
  const dateToday = GetFormatedDateTime(new Date(), dateFormat);
  const timeToday = GetFormatedDateTime(new Date(), timeFormat);
  const newDueDate = GetFormattedDueDate(new Date()).toString();

  const labels = {
    ConfirmationHeader: "Your Baltimore County Transient Occupancy Tax Return",
    ConfirmationSubHeader: "Transient Tax Return Submitted",
    ConfirmationBody: `You have successfully completed the Baltimore County Transient Occupancy Tax Return. Your confirmation number for this return is ${confirmationId}. <br><br> Please present this number to the appropriate Budget and Finance Official when making inquiries in regards to your Transient Occupancy Tax Return.`,
    ConfirmationNextPayment: `You have signed up for ${paymentInterval} payments; the due date for your next payment is ${newDueDate}`,
    ConfirmationTaxDetailsHeader: `${confirmationId} Transient Occupancy Tax Return Details:`
  };

  const ConfirmationGridValues = [
    { key: "Your Payment Plan", value: paymentInterval },
    { key: "Month of Return", value: dateToday },
    { key: "Due Date", value: newDueDate },
    { key: "Occupancy Tax Collected", value: occupancyTaxCollected },
    { key: "Exemptions", value: exemptionTotal },
    { key: "Penalties", value: penaltyTotal },
    { key: `${paymentInterval} Tax Remitted`, value: taxRemitted }
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
        <span className="">{dateToday} </span>
        <span className="">{timeToday}</span>
      </i>
      <h2>{labels.ConfirmationSubHeader}</h2>
      <p dangerouslySetInnerHTML={{ __html: labels.ConfirmationBody }}></p>
      <p>
        <em>{labels.ConfirmationNextPayment}</em>
      </p>
      <ConfirmationTable
        TaxDetailsHeader={labels.ConfirmationTaxDetailsHeader}
        ConfirmationGridValues={ConfirmationGridValues}
      />
    </div>
  );
};

export default connect(ConfirmationForm);
