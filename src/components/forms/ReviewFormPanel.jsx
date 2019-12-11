import React from "react";
import { Labels } from "../../common/Constants";
import { MapResponseDataForTaxReturn } from "../../data/TaxReturnMapper";
import { SaveReturn } from "../../services/ApiService";
import ReturnSummary from "../ReturnSummary";
import TransientTaxTabs from "../TransientTaxTabs";
import { GetReturnSummaryValues } from "../../data/TaxReturnMapper";

const ReviewPanel = props => {
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
  const { dueDate } = values;

  const handleSubmit = () => {
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
        returnType={""}
      />
      <label>{Labels.LegalNote}</label>
      {prevButton}
      {submitButton}
    </form>
  );
};

export default ReviewPanel;
