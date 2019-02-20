import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Icon.css";

const Icon = props => {
  const className = classNames("icon", {
    [`icon_${props.type}`]: true,
    [`icon_${props.color}`]: true
  });
  return <span className={className} />;
};

Icon.types = {
  clip: "clip"
};

Icon.colors = {
  default: "default",
  regular: "regular",
  destructive: "destructive"
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.values(Icon.types)).isRequired,
  color: PropTypes.oneOf(Object.values(Icon.colors)).isRequired
};

export default Icon;
