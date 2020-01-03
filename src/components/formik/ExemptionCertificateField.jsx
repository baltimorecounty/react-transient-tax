import React, { useEffect, useState } from "react";

import { AddOrUpdate } from "../../common/ArrayUtilities";
import ExemptionSelector from "./ExemptionSelector";
import ExemptionsList from "../ExemptionList";
import { Field } from "formik";
import { Messages } from "../../common/Constants";
import { SaveExemption } from "../../services/ApiService";

const ExemptionCertificate = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { setFieldValue } = form;
  const { exemptions: exemptionsFromProps = [], monthlyData = [] } = props;
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState(exemptionsFromProps);
  const [isSelectorFormDirty, setIsSelectorFormDirty] = useState(0);

  useEffect(() => {
    setFieldValue("exemptions", exemptions);
  }, [exemptions, setFieldValue]);

  useEffect(() => {
    setIsSelectorFormDirty(0);
  }, [setIsSelectorFormDirty]);

  const saveExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    const updatedExemptions = AddOrUpdate(
      exemptions,
      savedExemption,
      item => item.id === savedExemption.id
    );
    setFieldValue("isExemptionFormDirty", true);
    setExemptions(updatedExemptions);
    setIsSelectorFormDirty(0);
  };

  const editExemption = exemptionToEdit => {
    setFieldValue("isExemptionFormDirty", false);
    setExemption({ ...exemptionToEdit });
    setIsSelectorFormDirty(exemptionToEdit.id);
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
        monthlyData={monthlyData}
      />
      {exemptions.length > 0 && (
        <ExemptionsList
          exemptions={exemptions}
          isSelectorFormDirty={isSelectorFormDirty}
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
