import React from "react";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field } from "formik";
import { GetFormattedDueDate } from "../../common/DatesUtilities";
import InformationModal from "../InformationModal";

const IdentificationSection = ({ showTradeAlias }) => {
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
        {showTradeAlias ? (
          <div className="tt_form-field">
            <div className="tt_form-field__label">
              <label htmlFor="tradeAlias">Trade Alias</label>
              <InformationModal title="my tittle 0" content="my content 0" />
            </div>
            <div>
              <Field id="tradeAlias" name="tradeAlias" type="text" />
            </div>
          </div>
        ) : null}
        <div className="tt_form-field">
          <div className="tt_form-field__label">
            <label htmlFor="nameOfSubmitter">Return Submitted By</label>
            <InformationModal title="my tittle 1" content="my content 1" />
          </div>
          <div>
            <Field id="nameOfSubmitter" name="nameOfSubmitter" type="text" />
            <ErrorMessage name="nameOfSubmitter" />
          </div>
        </div>
        <div className="tt_form-field">
          <div className="tt_form-field__label">
            <label htmlFor="titleOfSubmitter">Title</label>
            <InformationModal title="my title 2" content="my content 2" />
          </div>
          <div>
            <Field id="titleOfSubmitter" name="titleOfSubmitter" type="text" />
            <ErrorMessage name="titleOfSubmitter" />
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
