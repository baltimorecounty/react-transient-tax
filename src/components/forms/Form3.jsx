import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Labels } from "../../common/Constants";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
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

  const {
    monthsToReport,
    grossOccupancy,
    governmentOnBusiness,
    roomRentalCollectionFromNonTransients
  } = formik.values;

  const [totalExemptions, setTotalExemptions] = useState();
  const [netRoomRentalCollections, setNetRoomRentalCollections] = useState();

  useEffect(() => {
    setTotalExemptions(
      governmentOnBusiness + roomRentalCollectionFromNonTransients
    );
  }, [governmentOnBusiness, roomRentalCollectionFromNonTransients]);

  useEffect(() => {
    setNetRoomRentalCollections(grossOccupancy + totalExemptions);
  }, [grossOccupancy, totalExemptions]);

  return (
    <Formik
      initialValues={{
        grossOccupancy: "",
        governmentOnBusiness: "",
        roomRentalCollectionFromNonTransients: ""
      }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        grossOccupancy: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required")
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="form-1">
            <React.Fragment>
              <div className="tt_form-section">
                <PaymentField
                  name="grossOccupancy"
                  label={Labels.GrossOccupancy}
                  monthsToReport={monthsToReport}
                />
              </div>
            </React.Fragment>
          </div>
          <div className="tt_form-section">
            <h3>{Labels.ExemptionTitle} (if applicable)</h3>
            <PaymentField
              isNegativeValue={true}
              name="roomRentalCollectionFromNonTransients"
              label={Labels.ExemptionOption1}
              monthsToReport={monthsToReport}
              className="tt_subtotal-item"
            />
            <PaymentField
              isNegativeValue={true}
              name="governmentOnBusiness"
              label={Labels.ExemptionOption2}
              monthsToReport={monthsToReport}
              className="tt_subtotal-item"
            />
            <PaymentTotal
              name="exemptionTotal"
              totals={totalExemptions}
              label={Labels.ExemptionTotal}
              className="tt_subtotal"
            />
            <PaymentTotal
              name="netRoomRentalTotal"
              totals={netRoomRentalCollections}
              label={Labels.NetRoomRentalLabel}
              className="tt_section-total"
            />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default Form3;
