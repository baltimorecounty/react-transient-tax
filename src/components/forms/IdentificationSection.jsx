import React from "react";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field } from "formik";
import { GetFormattedDueDate } from "../../common/DatesUtilities";
import Modal from "../forms/Modal";

const IdentificationSection = props => {
  return (
    <div className="tt_form-section">
      <div className="tt_date-group">
        <label htmlFor="submittedBy">Return Submitted By</label>
        <div className="tt_month-pickers">
          <div className="tt_month-picker">
            <Modal />
            <label>Date: {GetFormattedDueDate(new Date())}</label>
          </div>
        </div>
      </div>
      <div>
        <Field id="submittedBy" name="submittedBy" type="text" />
        <ErrorMessage name="submittedBy" />
      </div>
      <label htmlFor="title">Title</label>
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
