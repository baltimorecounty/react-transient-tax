import * as Yup from "yup";

import { Form, Formik } from "formik";

import DatePickerField from "../fields/DatePickerField";
import RadioButtonListField from "../fields/RadioButtonListField";
import React from "react";
import useExemptionTypes from "../hooks/useExemptionTypes";

const BasicInformationForm = props => {
  const [{ exemptionTypes, isLoading }] = useExemptionTypes();
  const { initialValues } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        alert(values);
      }}
      validationSchema={Yup.object({
        exemptionType: Yup.number().required(),
        exemptionFromDate: Yup.date().required(),
        exemptionToDate: Yup.date().required()
      })}
    >
      {props =>
        !isLoading ? (
          <div>
            <RadioButtonListField
              name="exemptionType"
              items={exemptionTypes}
              label="farts"
            />
            <div className="tt_date-rage-selector">
              <div>
                <DatePickerField name="exemptionFromDate" selectsStart />
              </div>
              <div>
                <DatePickerField
                  name="exemptionToDate"
                  selectsEnd
                  //   minDate={addDays(fromDate, 1)}
                  //   startDate={fromDate}
                />
              </div>
            </div>
            <button type="submit">Add</button>
          </div>
        ) : (
          <p>Loading Form ...</p>
        )
      }
    </Formik>
  );
};

export default BasicInformationForm;
