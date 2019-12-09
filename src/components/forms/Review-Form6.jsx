import { Form, Formik } from "formik";
import React from "react";
import { SaveReturn } from "../../services/ApiService";
import { Labels } from "../../common/Constants";
import TransientTaxTabs from "../TransientTaxTabs";

const ReviewForm6 = props => {
  const {
    submitButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    history,
    label,
    formik
  } = props;

  const handleSubmit = () => {
    console.log(formik.values);
    SaveReturn(formik.values).then(({ ConfirmationNumber = 0 }) => {
      history.push(`/confirmation/${ConfirmationNumber}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
      <h2>{label}</h2>
      <label>{Labels.LegalNote}</label>
      {prevButton}
      {submitButton}
    </form>
  );
};

export default ReviewForm6;
