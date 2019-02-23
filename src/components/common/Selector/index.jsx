import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";
import SelectorValues from "../SelectorValues";

import "./Selector.css";

const renderRemoveButton = (showRemove, removeValue) => {
  if (!showRemove) {
    return null;
  }
  return (
    <button
      type="button"
      className="selector__action selector__action_remove"
      onClick={removeValue}
    >
      <Icon type={Icon.types.remove} />
    </button>
  );
};

const renderValues = (
  props,
  selected,
  visibleSelection,
  handleSelect,
  handleMouse,
  showValues
) => {
  if (!showValues) {
    return;
  }
  return (
    <SelectorValues
      values={props.values}
      showSelection={visibleSelection}
      selected={props.values[selected]}
      onSelect={handleSelect}
      onMouse={handleMouse}
    />
  );
};

const Selector = props => {
  const [showRemove, setShowRemove] = useState(props.value ? true : false);
  const [showValues, setShowValues] = useState(false);
  const [selected, setSelected] = useState(
    props.value ? props.values.findIndex(i => i === props.value) : 0
  );
  const [visibleSelection, setVisibleSelection] = useState(true);
  const inputRef = useRef(null);
  const className = classNames("selector", {
    selector_invalid: props.invalid
  });

  if (props.focus) {
    inputRef.current.focus();
  }
  if (inputRef.current) {
    inputRef.current.value = props.value || "";
  }

  const handleFocus = () => {
    setSelected(
      props.value ? props.values.findIndex(i => i === props.value) : 0
    );
    setVisibleSelection(true);
    setShowValues(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowValues(false);
    }, 50);
  };

  const handleSelect = value => {
    props.onChange(value);
    inputRef.current.value = value;
    inputRef.current.blur();
    setShowRemove(true);
  };

  const handleMouse = () => {
    if (visibleSelection) {
      setVisibleSelection(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(Math.min(selected + 1, props.values.length - 1));
      if (!visibleSelection) {
        setVisibleSelection(true);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(Math.max(selected - 1, 0));
      if (!visibleSelection) {
        setVisibleSelection(true);
      }
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(props.values[selected]);
    }
  };

  const handleOnClick = () => {
    // if (showValues) {
    //   setShowValues(false);
    // }
  };

  const removeValue = () => {
    props.onChange(null);
    inputRef.current.value = "";
    setShowRemove(false);
  };

  return (
    <div className={className}>
      <input
        className="selector__input"
        type="button"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleOnClick}
      />
      <div className="selector__actions">
        {renderRemoveButton(showRemove, removeValue)}
        <div className="selector__action selector__action_arrow">
          <Icon type={Icon.types.arrow} />
        </div>
      </div>
      {renderValues(
        props,
        selected,
        visibleSelection,
        handleSelect,
        handleMouse,
        showValues
      )}
    </div>
  );
};

Selector.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

Selector.defaultProps = {
  focus: false,
  invalid: false
};

export default Selector;
