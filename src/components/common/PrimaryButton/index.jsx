import React from "react";
import PropTypes from "prop-types";

import "./PrimaryButton.css";

const PrimaryButton = props => {
  return <input type="submit" value={props.value} className="primary-button" />;
};

PrimaryButton.propTypes = {
  value: PropTypes.string.isRequired
};

export default PrimaryButton;
