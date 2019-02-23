import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import validationTypes from "../../../constants/validationTypes";
import buttonTypes from "../../../constants/buttonTypes";
import contactTypes from "../../../constants/contactTypes";

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
  arrow: "arrow",
  remove: "remove",
  ...validationTypes,
  ...contactTypes
};

Icon.colors = {
  default: "default",
  ...buttonTypes
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.values(Icon.types)).isRequired,
  color: PropTypes.oneOf(Object.values(Icon.colors)).isRequired
};

Icon.defaultProps = {
  color: Icon.colors.default
};

export default Icon;
