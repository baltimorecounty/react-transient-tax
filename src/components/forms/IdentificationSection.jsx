import React from "react";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field } from "formik";
import { GetFormattedDueDate } from "../../common/DatesUtilities";
import InformationModal from "../InformationModal";

const IdentificationSection = props => {
  return (
    <div className="tt_form-section">
      <div className="tt_date-group">
        <label htmlFor="submittedBy">
          Return Submitted By
          <InformationModal title="my tittle 1" content="my content 1" />
        </label>
        <div className="tt_month-pickers">
          <div className="tt_month-picker">
            <label>Date: {GetFormattedDueDate(new Date())}</label>
          </div>
        </div>
      </div>
      <div>
        <Field id="submittedBy" name="submittedBy" type="text" />
        <ErrorMessage name="submittedBy" />
      </div>
      <label htmlFor="title">Title</label>

      <InformationModal title="my title 2" content="my content 2" />
      <div>
        <Field id="title" name="title" type="text" />
        <ErrorMessage name="title" />
      </div>
      <label htmlFor="email">Email</label>
      <div>
        <Field id="email" name="email" type="text" />
        <ErrorMessage name="email" />
      </div>
      <div>
        <label>{Labels.LegalNote}</label>
      </div>
    </div>
  );
};

export default IdentificationSection;
