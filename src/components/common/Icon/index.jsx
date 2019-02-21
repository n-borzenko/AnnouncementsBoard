import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import validationTypes from "../../../constants/validationTypes";
import actionTypes from "../../../constants/actionTypes";

import "./Icon.css";

const Icon = props => {
  const className = classNames(
    "icon",
    `icon_${props.type}`,
    `icon_${props.color}`
  );
  return <span className={className} />;
};

Icon.types = {
  clip: "clip",
  ...validationTypes
};

Icon.colors = {
  default: "default",
  ...actionTypes
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.values(Icon.types)).isRequired,
  color: PropTypes.oneOf(Object.values(Icon.colors)).isRequired
};

Icon.defaultProps = {
  color: Icon.colors.default
};

export default Icon;
