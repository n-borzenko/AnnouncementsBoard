import React, { useState, useRef, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./MaskedInput.css";

const numbers = Object.keys([...Array(10)]);

const MaskedInput = props => {
  const className = classNames("masked-input", {
    "masked-input_invalid": props.invalid
  });

  const supportedSymbols = useMemo(
    () => new Set(props.mask.split("").concat(numbers)),
    [props.mask]
  );
  const { name, mask, id } = props;
  const [value, setValue] = useState(props.value || props.mask);

  useEffect(() => {
    const newValue = props.value || props.mask;
    setValue(newValue);
    inputRef.current.value = newValue;
  }, [props.value]);

  const inputRef = useRef(null);
  if (props.focus) {
    inputRef.current.focus();
  }

  const handleBlur = () => {
    props.onBlur(value);
  };

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

    if (startPosition !== endPosition) {
      const cutPart = props.mask.substr(
        startPosition,
        endPosition - startPosition
      );
      newValue =
        newValue.substr(0, startPosition) +
        cutPart +
        newValue.substr(endPosition);
      updateInput(newValue, startPosition);
      e.preventDefault();
      return;
    }

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

    if (e.key === "Enter") {
      inputRef.current.blur();
      //props.onBlur(value);
      return;
    }

    // skip incorrect symbols
    if (!supportedSymbols.has(e.key)) {
      e.preventDefault();
      return;
    }

    // if entered symbol from mask, move caret
    if (
      props.mask[startPosition] !== "_" &&
      e.key === props.mask[startPosition]
    ) {
      updateInput(null, startPosition + 1);
      e.preventDefault();
      return;
    }

    // skip symbols, which are not numbers
    if (!numbers.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // search first correct place for number
    while (
      props.mask[startPosition] !== "_" &&
      startPosition <= props.mask.length - 1
    ) {
      startPosition += 1;
    }

    // mask end reached
    if (startPosition === props.mask.length) {
      e.preventDefault();
      return;
    }

    const length = 1;
    const lastPart =
      startPosition + length >= endPosition
        ? newValue.substr(startPosition + length)
        : props.mask.substr(
            startPosition + length,
            endPosition - startPosition - length
          ) + newValue.substr(endPosition);
    newValue = newValue.substr(0, startPosition) + e.key + lastPart;
    updateInput(newValue, startPosition + 1);
    e.preventDefault();
  };

  const handleCut = e => {
    let startPosition = e.target.selectionStart;
    let endPosition = e.target.selectionEnd;
    let newValue = value;
    const cutPart = props.mask.substr(
      startPosition,
      endPosition - startPosition
    );
    newValue =
      newValue.substr(0, startPosition) +
      cutPart +
      newValue.substr(endPosition);
    setTimeout(() => {
      updateInput(newValue, startPosition);
    }, 0);
  };

  const handlePaste = e => {
    let text = e.clipboardData.getData("Text");
    if (!text) {
      e.preventDefault();
      return;
    }
    text = text.split("").filter(s => numbers.includes(s));
    if (!text.length) {
      e.preventDefault();
      return;
    }

    let startPosition = e.target.selectionStart;
    let newValue = value;

    // search first correct place for number
    while (
      props.mask[startPosition] !== "_" &&
      startPosition <= props.mask.length - 1
    ) {
      startPosition += 1;
    }

    // mask end reached
    if (startPosition === props.mask.length) {
      e.preventDefault();
      return;
    }

    // formated pasted numbers
    let pastePart = "";
    for (
      let i = startPosition, j = 0;
      i < props.mask.length && j < text.length;
      i++
    ) {
      if (props.mask[i] === "_") {
        pastePart += text[j];
        j += 1;
      } else {
        pastePart += props.mask[i];
      }
    }

    newValue =
      newValue.substr(0, startPosition) +
      pastePart +
      newValue.substr(startPosition + pastePart.length);
    updateInput(
      newValue,
      Math.min(startPosition + pastePart.length, props.mask.length)
    );
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
      onCut={handleCut}
      onPaste={handlePaste}
      onBlur={handleBlur}
      defaultValue={value}
      ref={inputRef}
      id={id}
    />
  );
};

MaskedInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  mask: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired
};

MaskedInput.defaultProps = {
  invalid: false,
  focus: false
};

export default MaskedInput;
