import React from "react";
import { Labels } from "../../common/Constants";
import { SaveReturn } from "../../services/ApiService";
import ReturnSummary from "../ReturnSummary";
import TransientTaxTabs from "../TransientTaxTabs";

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

  //   const mappedValues = MapResponseDataForTaxReturn(values);

  //   console.log(values);

  return (
    <form onSubmit={handleSubmit}>
      <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
      <h2>{label}</h2>
      <ReturnSummary
        header={"Transient Occupancy Tax Return Details:"}
        values={[]}
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
