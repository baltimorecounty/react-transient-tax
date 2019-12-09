import React from "react";
import PropTypes from "prop-types";

const Address = ({ line1, line2, street, city }) => (
  <div className="tt_address">
    <p>{line1}</p>
    <p>{line2}</p>
    <p>{street}</p>
    <p>{city}</p>
  </div>
);

Address.propTypes = {
  /** Flexible line to show  */
  line1: PropTypes.string.isRequired,
  /** Office or department */
  line2: PropTypes.string.isRequired,
  /** Street Address */
  street: PropTypes.string.isRequired,
  /** City, State, Zip */
  city: PropTypes.string.isRequired
};

export default Address;
