import React from "react";
import PropTypes from "prop-types";

import "./PrimaryButton.css";

const PrimaryButton = props => {
  return (
    <button type="submit" className="primary-button">
      {props.children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrimaryButton;
