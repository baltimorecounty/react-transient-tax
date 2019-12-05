import React, { useState, useEffect } from "react";
import ExemptionSelector from "../ExemptionSelector";
import ExemptionsList from "../ExemptionList";
import { AddOrUpdate } from "../../common/ArrayUtilities";
import { SaveExemption } from "../../services/ApiService";
import { Field } from "formik";
import { Messages } from "../../common/Constants";

const ExemptionCertificate = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { setFieldValue } = form;
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState([]);

  useEffect(() => {
    setFieldValue("exemptions", exemptions);
  }, [exemptions, setFieldValue]);

  const saveExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    const updatedExemptions = AddOrUpdate(
      exemptions,
      savedExemption,
      item => item.id === savedExemption.id
    );
    setFieldValue("isExemptionFormDirty", true);
    setExemptions(updatedExemptions);
  };

  const editExemption = exemptionToEdit => {
    setFieldValue("isExemptionFormDirty", false);
    setExemption({ ...exemptionToEdit });
  };

  const removeExemption = exemptionId => {
    setExemptions(exemptions.filter(exemption => exemption.id !== exemptionId));
    setExemption({});
  };

  return (
    <div className="tt_form-section">
      <p>{Messages.ExemptionCertificate.Certification}</p>
      <ExemptionSelector
        exemption={exemption}
        onExemptionSave={saveExemption}
      />
      {exemptions.length > 0 && (
        <ExemptionsList
          exemptions={exemptions}
          handleEditClick={editExemption}
          handleRemoveClick={removeExemption}
        />
      )}
      <p>{Messages.ExemptionCertificate.Qualification}</p>
    </div>
  );
};

const ExemptionCertificateField = props => (
  <Field component={ExemptionCertificate} {...props} />
);

export default ExemptionCertificateField;
