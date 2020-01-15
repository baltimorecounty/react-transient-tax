import React, { useState } from "react";

import { GetReturnSummaryValues } from "../../data/TaxReturnMapper";
import { Labels } from "../../common/Constants";
import { MapResponseDataForTaxReturn } from "../../data/TaxReturnMapper";
import ReturnSummary from "../ReturnSummary";
import { SaveReturn } from "../../services/ApiService";

const ReviewFormPanel = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitButton, prevButton, history, formik } = props;

  const { values } = formik;
  const {
    returnStatus: { dueDate } = {},
    paymentInterval
  } = values.monthsToReport;

  /** Helper to generate a unique id for confirmation number */
  const generateConfirmationNumberId = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    SaveReturn(values).then(({ ConfirmationNumber = 0 }) => {
      history.push(
        `/confirmation/${generateConfirmationNumberId()}-${ConfirmationNumber}`
      );
    });
  };

  const mappedValues = MapResponseDataForTaxReturn(values);
  const taxReturnValues = GetReturnSummaryValues(mappedValues);

  return (
    <form onSubmit={handleSubmit}>
      <ReturnSummary
        header={"Transient Occupancy Tax Return Details:"}
        values={taxReturnValues}
        dueDate={dueDate}
        paymentInterval={paymentInterval}
      />
      <label>{Labels.LegalNote}</label>
      {!isSubmitting && (
        <div className="tt_form-controls">
          {prevButton}
          {submitButton}
        </div>
      )}
      {isSubmitting && (
        <p>
          Submitting your return. You will be redirected to a confirmation page
          shortly...
        </p>
      )}
    </form>
  );
};

export default ReviewFormPanel;
