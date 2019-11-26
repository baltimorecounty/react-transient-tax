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
  const [isEdit, setIsEdit] =useState(0);

  useEffect(() => {
    setFieldValue("exemptions", exemptions);
  }, [exemptions, setFieldValue]);

  useEffect(() => {
    setIsEdit(true);
  }, [setIsEdit]);

  const saveExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    const updatedExemptions = AddOrUpdate(exemptions, savedExemption);
    setExemptions(updatedExemptions);
    setIsEdit(0);
  };

  const editExemption = (exemptionToEdit) => {
    setExemption({ ...exemptionToEdit });
    setIsEdit(exemptionToEdit.id);
  };

  const removeExemption = exemptionId => {
    setExemptions(exemptions.filter(exemption => exemption.id !== exemptionId));
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
          isEdit={isEdit}
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
