import React from "react";
import { Labels } from "../../common/Constants";
import {
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../../common/DatesUtilities";
import { connect } from "formik";

const {
  ConfirmationHeader,
  ConfirmationSubHeader,
  ConfirmationBody,
  ConfirmationNextPayment,
  ConfirmationTaxDetailsHeader,
  ConfirmationGridPaymentPlan,
  ConfirmationGridInterval,
  ConfirmationGridDueDate,
  ConfirmationGridOccupancyTaxCollected,
  ConfirmationGridExemptions,
  ConfirmationGridPenalties,
  ConfirmationGridTaxRemitted
} = Labels;

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
  const confirmBody = ConfirmationBody.replace("{ID}", confirmationId);
  const newDueDate = GetFormattedDueDate(new Date()).toString();

  /*****Updates constants labels with specific data from the API response***/
  const gridTaxRemitted = ConfirmationGridTaxRemitted.replace(
    "{PaymentInterval}",
    paymentInterval
  );
  const nextPayment = ConfirmationNextPayment.replace(
    "{PaymentInterval}",
    paymentInterval
  ).replace("{DueDate}", newDueDate);
  const taxDetailsHeader = ConfirmationTaxDetailsHeader.replace(
    "{ID}",
    confirmationId
  );
  /******************************************************************/
  return (
    <div className="tt_form-section">
      <div>
        <a name="Skip"></a>
      </div>
      <h1>
        <span>{ConfirmationHeader}</span>
      </h1>
      <i>
        <span class="">{dateToday} </span>
        <span class="">{timeToday}</span>
      </i>
      <h2>{ConfirmationSubHeader}</h2>
      <p dangerouslySetInnerHTML={{ __html: confirmBody }}></p>
      <p>
        <em>{nextPayment}</em>
      </p>
      <h3>{taxDetailsHeader}</h3>
      <table align="left" cellpadding="1" cellspacing="1" id="BACO_table">
        <tbody>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridPaymentPlan}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{paymentInterval}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridInterval}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{dateToday}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridDueDate}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{newDueDate}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridOccupancyTaxCollected}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{occupancyTaxCollected}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridExemptions}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{exemptionTotal}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{ConfirmationGridPenalties}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>{penaltyTotal}</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{gridTaxRemitted}</strong>
              </p>
            </td>
            <td colspan="1" rowspan="1">
              <p>
                <strong>{taxRemitted}</strong>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default connect(ConfirmationForm);
