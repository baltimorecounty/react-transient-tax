import React, { useState } from "react";
import { Labels } from "../../common/Constants";
import { MapResponseDataForTaxReturn } from "../../data/TaxReturnMapper";
import { SaveReturn } from "../../services/ApiService";
import ReturnSummary from "../ReturnSummary";
import TransientTaxTabs from "../TransientTaxTabs";
import { GetReturnSummaryValues } from "../../data/TaxReturnMapper";

const ReviewPanel = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    submitButton,
    prevButton,
    tabs,
    isActiveStep,
    history,
    label,
    formik
  } = props;

  const { values } = formik;
  const { dueDate, paymentInterval } = values;

  const handleSubmit = () => {
    setIsSubmitting(true);
    SaveReturn(values).then(({ ConfirmationNumber = 0 }) => {
      history.push(`/confirmation/${ConfirmationNumber}`);
    });
  };

  const mappedValues = MapResponseDataForTaxReturn(values);
  const taxReturnValues = GetReturnSummaryValues(mappedValues);

  return (
    <form onSubmit={handleSubmit}>
      <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
      <h2>{label}</h2>
      <ReturnSummary
        header={"Transient Occupancy Tax Return Details:"}
        values={taxReturnValues}
        dueDate={dueDate}
        paymentInterval={paymentInterval}
      />
      <label>{Labels.LegalNote}</label>
      {!isSubmitting && prevButton}
      {!isSubmitting && submitButton}
      {isSubmitting && (
        <p>
          Submitting your return. You will be redirected to a confirmation page
          shortly...
        </p>
      )}
    </form>
  );
};

export default ReviewPanel;
