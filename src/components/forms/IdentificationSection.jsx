import React from "react";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field } from "formik";
import {GetFormattedDueDate} from "../../common/DatesUtilities"; 
import { connect } from "formik";

const IdentificationSection = props => {
  return (
    <React.Fragment>
      <div className="tt_form-section">
        <label htmlFor="submittedBy">Return Submitted By</label>
        <label htmlFor="labelQuestion">{Labels.WhyDoWeNeedThis}</label>
        <label htmlFor="Date">Date:{GetFormattedDueDate(new Date())}</label>
        <div>
          <Field id="submittedBy" name="submittedBy" type="text" />
          <ErrorMessage name="submittedBy" />
        </div>
        <label htmlFor="title">Title</label>
        <label htmlFor="labelQuestion">{Labels.WhyDoWeNeedThis}</label>
        <div>
          <Field id="title" name="title" type="text" />
          <ErrorMessage name="title" />
        </div>
        <label htmlFor="address">Address</label>
        <label htmlFor="labelQuestion">{Labels.WhyDoWeNeedThis}</label>
        <div>
          <Field id="email" name="email" type="text" />
          <ErrorMessage name="email" />
        </div>
      </div>
      <div>
        <label htmlFor="labelLegalNote">{Labels.LegalNote}</label>
      </div>
    </React.Fragment>
  );
};

export default connect(IdentificationSection);
