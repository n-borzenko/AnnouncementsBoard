import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./MaskedInput.css";

const MaskedInput = props => {
  const className = classNames("masked-input", {
    input_invalid: props.invalid
  });
  const { name, mask } = props;
  const [value, setValue] = useState(props.mask);
  const inputRef = useRef(null);

  const updateInput = (newValue, start, end = null) => {
    if (newValue) {
      inputRef.current.value = newValue;
    }
    inputRef.current.selectionStart = start;
    inputRef.current.selectionEnd = end || start;
    if (newValue) {
      setValue(newValue);
    }
  };

  const handleKeyDown = e => {
    if (e.key !== "Backspace") {
      return;
    }

    let startPosition = e.target.selectionStart;
    let endPosition = e.target.selectionEnd;
    let newValue = value;

    if (startPosition === 0) {
      e.preventDefault();
      return;
    }
    if (props.mask[startPosition - 1] !== "_") {
      updateInput(null, startPosition - 1);
      e.preventDefault();
      return;
    }

    const length = 1;
    newValue =
      newValue.substr(0, startPosition - 1) +
      mask.substr(startPosition - 1, length) +
      newValue.substr(startPosition - 1 + length);

    updateInput(newValue, startPosition - 1);
    e.preventDefault();
    return;
  };

  const handleKeyPress = e => {
    let startPosition = e.target.selectionStart;
    let endPosition = e.target.selectionEnd;
    let newValue = value;

    if (e.key < "0" || e.key > "9") {
      e.preventDefault();
      return;
    }
    while (
      props.mask[startPosition] !== "_" &&
      startPosition <= props.mask.length - 1
    ) {
      startPosition += 1;
    }

    if (startPosition === props.mask.length) {
      e.preventDefault();
      return;
    }

    const length = 1;
    newValue =
      newValue.substr(0, startPosition) +
      e.key +
      newValue.substr(startPosition + length);
    updateInput(newValue, startPosition + 1);
    e.preventDefault();
  };

  return (
    <input
      type="text"
      className={className}
      name={name}
      placeholder={mask}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      defaultValue={value}
      ref={inputRef}
    />
  );
};

MaskedInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

MaskedInput.defaultProps = {
  invalid: false
};

export default MaskedInput;
