import React from "react";
import PropTypes from "prop-types";

import "./Title.css";

const Title = props => {
  return <span className="title">{props.children}</span>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired
};

export default Title;
