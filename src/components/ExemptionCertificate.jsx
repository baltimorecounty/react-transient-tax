import React from "react";
import ExemptionSelector from "./ExemptionSelector";

const ExemptionCertificate = props => (
  <div className="tt_form-section">
    <p>
      I certify that the occupancy of the facilities above have been (or will
      be) furnished for the exclusive use of and will be paid by or from the
      funds of:
    </p>
    <ExemptionSelector />
    <p>
      That all of the qualifications explained on this form have been met so as
      to exempt this occupancy from the tax imposed by County Code 11-4-401.
    </p>
  </div>
);

export default ExemptionCertificate;
