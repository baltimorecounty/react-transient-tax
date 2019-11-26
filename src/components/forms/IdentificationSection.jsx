import React from "react";
import { Labels } from "../../common/Constants";
import Field from "../Field";
import { GetFormatedDateTime } from "../../common/DatesUtilities";
import InformationModal from "../InformationModal";

const IdentificationSection = ({ showTradeAlias }) => {
  return (
    <div className="tt_form-section tt_identification-section">
      <div className="tt_date-group float-right">
        <div className="tt_month-pickers">
          <div className="tt_month-picker">
            <label>Date: {GetFormatedDateTime(new Date())}</label>
          </div>
        </div>
      </div>
      <div className="float-left">
        {showTradeAlias ? (
          <Field
            id="tradeAlias"
            name="tradeAlias"
            type="text"
            label="Account Number"
            infoComponent={
              <InformationModal
                title="Trade Alias"
                content="Trade Alias is an optional field that..."
              />
            }
          />
        ) : null}
        <Field
          id="nameOfSubmitter"
          name="nameOfSubmitter"
          type="text"
          label="Return Submitted By"
          infoComponent={
            <InformationModal
              title="Return Submitted By"
              content="We need to associate a name with a business in the case we have any follow up questions on the return."
            />
          }
        />
        <Field
          id="titleOfSubmitter"
          name="titleOfSubmitter"
          type="text"
          label="Title of Submitter"
          infoComponent={
            <InformationModal
              title="Title of Submitter"
              content="We need to associate a title with the person who submitted the return in the case we have any follow up questions on the return."
            />
          }
        />
        <Field
          id="email"
          name="email"
          type="text"
          label="Email"
          infoComponent={
            <InformationModal
              title="Email"
              content="We will send you a confirmation number that you will bring when you pay the form in person."
            />
          }
        />
        <div>
          <label>{Labels.LegalNote}</label>
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default IdentificationSection;
