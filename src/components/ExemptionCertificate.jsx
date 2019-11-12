import React, { useState } from "react";
import ExemptionSelector from "./ExemptionSelector";
import ExemptionsList from "./ExemptionList";

const ExemptionCertificate = props => {
  const [exemptions, setExemptions] = useState([]);

  const addExemption = exemption => {
    setExemptions([...exemptions, exemption]);
  };

  return (
    <div className="tt_form-section">
      <p>
        I certify that the occupancy of the facilities above have been (or will
        be) furnished for the exclusive use of and will be paid by or from the
        funds of:
      </p>
      <ExemptionSelector onExemptionAdd={addExemption} />
      {exemptions.length > 0 && <ExemptionsList exemptions={exemptions} />}
      <p>
        That all of the qualifications explained on this form have been met so
        as to exempt this occupancy from the tax imposed by County Code
        11-4-401.
      </p>
    </div>
  );
};

export default ExemptionCertificate;
