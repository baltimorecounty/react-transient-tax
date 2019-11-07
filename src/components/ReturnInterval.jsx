import React from "react";
import PropTypes from "prop-types";

const ReturnInterval = props => {
  const { intervalType } = props;
  return (
    <div className="">
      <label htmlFor="">
        Month{intervalType === "monthly" ? "" : "s"} for Return
      </label>
    </div>
  );
};

ReturnInterval.propTypes = {
  /** 'monthly' or 'quarterly' which allows us to control the ui accordingly  */
  intervalType: PropTypes.string.isRequired
};

export default ReturnInterval;
