import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Input.css";

const Input = props => {
  const className = classNames("input", {
    input_invalid: props.invalid,
    input_multiline: props.multiline
  });

  const inputRef = useRef(null);
  if (props.focus) {
    inputRef.current.focus();
  }

  useEffect(() => {
    inputRef.current.value = props.value;
  }, [props.value]);

  const handleBlur = e => {
    props.onBlur(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      props.onBlur(e.target.value);
      return;
    }
  };

  const { maxLength, name, id, value } = props;
  return props.multiline ? (
    <textarea
      className={className}
      maxLength={maxLength}
      name={name}
      id={id}
      onBlur={handleBlur}
      defaultValue={value}
      ref={inputRef}
    />
  ) : (
    <input
      type="text"
      className={className}
      maxLength={maxLength}
      name={name}
      onBlur={handleBlur}
      id={id}
      defaultValue={value}
      ref={inputRef}
      onKeyPress={handleKeyPress}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  multiline: PropTypes.bool.isRequired,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired
};

Input.defaultProps = {
  invalid: false,
  multiline: false,
  focus: false
};

export default Input;
