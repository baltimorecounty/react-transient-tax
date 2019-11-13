import React from "react";
import { Labels } from "../common/Constants";

const { NetRoomRentalLabel } = Labels;

const NetRoomRental = props => {
  const total = "";
  return (
    <React.Fragment>
      <div className="tt_exemption-options tt_exemption-totals">
        <p>{NetRoomRentalLabel}</p>
        <p>${total}</p>
      </div>
    </React.Fragment>
  );
};

export default NetRoomRental;
