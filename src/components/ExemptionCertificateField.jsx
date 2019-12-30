import React, { useEffect, useState } from "react";

import { AddOrUpdate } from "../common/ArrayUtilities";
import ExemptionSelector from "./ExemptionSelector";
import { Field } from "formik";
import { Messages } from "../common/Constants";
import { SaveExemption } from "../services/ApiService";

const ExemptionCertificate = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { setFieldValue } = form;
  const { handleSave, exemptions: exemptionsFromProps = [] } = props;
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState(exemptionsFromProps);

  const saveExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    const updatedExemptions = AddOrUpdate(
      exemptions,
      savedExemption,
      item => item.id === savedExemption.id
    );
    setExemptions(updatedExemptions);
    handleSave(updatedExemptions);
  };

  return (
    <div className="tt_form-section">
      <p>{Messages.ExemptionCertificate.Certification}</p>
      <ExemptionSelector
        exemption={exemption}
        onExemptionSave={saveExemption}
      />
      <p>{Messages.ExemptionCertificate.Qualification}</p>
    </div>
  );
};

const ExemptionCertificateField = props => (
  <Field component={ExemptionCertificate} {...props} />
);

export default ExemptionCertificateField;
