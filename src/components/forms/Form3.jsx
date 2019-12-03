import React from "react";
import { Formik, Form } from "formik";
import { Labels } from "../../common/Constants";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import GrossOccupancySection from "../../components/forms/GrossOccupancySection";
import ExemptionsSection from "../../components/forms/ExemptionsSection";
import { GetCalculatedTotals } from "../../common/Calculations";
import * as Yup from "yup";

const Form3 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    label,
    formik
  } = props;

  const { monthsToReport } = formik.values;

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="form-1">
            <React.Fragment>
              <GrossOccupancySection
                label={Labels.GrossOccupancy}
                monthsToReport={monthsToReport}
              />
              <ExemptionsSection
                labels={Labels}
                monthsToReport={monthsToReport}
                //totalExemptions={totalExemptions}
              />
            </React.Fragment>
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default Form3;
