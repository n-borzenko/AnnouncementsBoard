import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Input.css";

const Input = props => {
  const className = classNames("input", {
    input_invalid: props.invalid,
    input_multiline: props.multiline
  });
  const { maxLength, name } = props;
  return props.multiline ? (
    <textarea className={className} maxLength={maxLength} name={name} />
  ) : (
    <input
      type="text"
      className={className}
      maxLength={maxLength}
      name={name}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  multiline: PropTypes.bool.isRequired,
  maxLength: PropTypes.number
};

Input.defaultProps = {
  invalid: false,
  multiline: false
};

export default Input;
