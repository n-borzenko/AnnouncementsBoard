import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Input.css";

const Input = props => {
  const className = classNames("input", {
    input_invalid: props.invalid,
    input_multiline: props.multiline
  });
  const handleBlur = e => {
    props.onBlur(e.target.value);
  };

  const { maxLength, name, id } = props;
  return props.multiline ? (
    <textarea
      className={className}
      maxLength={maxLength}
      name={name}
      id={id}
      onBlur={handleBlur}
    />
  ) : (
    <input
      type="text"
      className={className}
      maxLength={maxLength}
      name={name}
      onBlur={handleBlur}
      id={id}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  multiline: PropTypes.bool.isRequired,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

Input.defaultProps = {
  invalid: false,
  multiline: false
};

export default Input;
