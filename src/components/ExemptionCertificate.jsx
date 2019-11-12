import React, { useState } from "react";
import ExemptionSelector from "./ExemptionSelector";
import ExemptionsList from "./ExemptionList";

const ExemptionCertificate = props => {
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState([]);

  const addExemption = exemption => {
    const indexedExemption = {
      ...exemption,
      ...{ id: exemptions.length }
    };
    setExemptions([...exemptions, indexedExemption]);
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

export default ExemptionCertificate;
