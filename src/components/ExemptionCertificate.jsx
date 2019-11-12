import React, { useState, useEffect } from "react";
import ExemptionSelector from "./ExemptionSelector";
import ExemptionsList from "./ExemptionList";
import { SaveExemption } from "../services/ApiService";
import { connect } from "formik";

const ExemptionCertificate = props => {
  const { formik } = props;
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState([]);

  useEffect(() => {
    formik.setValues({ exemptions });
  }, [exemptions, formik]);

  const addExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    setExemptions([...exemptions, savedExemption]);
  };

  const editExemption = exemptionToEdit => {
    setExemption({ ...exemptionToEdit });
  };

  const removeExemption = exemptionId => {
    setExemptions(exemptions.filter(exemption => exemption.id !== exemptionId));
  };

  return (
    <div className="tt_form-section">
      <p>
        I certify that the occupancy of the facilities above have been (or will
        be) furnished for the exclusive use of and will be paid by or from the
        funds of:
      </p>
      <ExemptionSelector exemption={exemption} onExemptionAdd={addExemption} />
      {exemptions.length > 0 && (
        <ExemptionsList
          exemptions={exemptions}
          handleEditClick={editExemption}
          handleRemoveClick={removeExemption}
        />
      )}
      <p>
        That all of the qualifications explained on this form have been met so
        as to exempt this occupancy from the tax imposed by County Code
        11-4-401.
      </p>
    </div>
  );
};

export default connect(ExemptionCertificate);
