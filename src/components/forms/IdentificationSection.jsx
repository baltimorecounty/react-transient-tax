import React from "react";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field } from "formik";
import { GetFormattedDueDate } from "../../common/DatesUtilities";
import InformationModal from "../InformationModal";

const IdentificationSection = props => {
  return (
    <div className="tt_form-section tt_identification-section">
      <div className="tt_date-group float-right">
        <div className="tt_month-pickers">
          <div className="tt_month-picker">
            <label>Date: {GetFormattedDueDate(new Date())}</label>
          </div>
        </div>
      </div>
      <div className="float-left">
        <div className="tt_form-field">
          <div className="tt_form-field__label">
            <label htmlFor="submittedBy">Return Submitted By</label>
            <InformationModal title="my tittle 1" content="my content 1" />
          </div>
          <div>
            <Field id="submittedBy" name="submittedBy" type="text" />
            <ErrorMessage name="submittedBy" />
          </div>
        </div>
        <div className="tt_form-field">
          <div className="tt_form-field__label">
            <label htmlFor="title">Title</label>
            <InformationModal title="my title 2" content="my content 2" />
          </div>
          <div>
            <Field id="title" name="title" type="text" />
            <ErrorMessage name="title" />
          </div>
        </div>
        <div className="tt_form-field">
          <div className="tt_form-field__label">
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <Field id="email" name="email" type="text" />
            <ErrorMessage name="email" />
          </div>
        </div>
        <div>
          <label>{Labels.LegalNote}</label>
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default IdentificationSection;
