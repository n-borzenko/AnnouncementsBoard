import React from "react";
import PropTypes from "prop-types";

import "./Text.css";

const Text = props => {
  return <span className="text">{props.children}</span>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired
};

export default Text;
