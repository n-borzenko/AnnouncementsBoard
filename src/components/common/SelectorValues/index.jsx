import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SelectorValues.css";

const SelectorValues = props => {
  const divClassName = classNames("selector-values", {
    "selector-values_mouse-hidden": props.showSelection
  });

  return (
    <div
      className={divClassName}
      onMouseEnter={props.onMouse}
      onMouseMove={props.onMouse}
    >
      {props.values.map(value => {
        const className = classNames("selector-values__value", {
          "selector-values__value_selected":
            props.selected === value && props.showSelection
        });
        return (
          <div
            className={className}
            onClick={() => {
              props.onSelect(value);
            }}
            key={value}
          >
            {value}
          </div>
        );
      })}
      <div className="selector-values__border" />
    </div>
  );
};

SelectorValues.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showSelection: PropTypes.bool.isRequired,
  onMouse: PropTypes.func.isRequired
};

SelectorValues.defaultProps = {
  showSelection: true
};

export default SelectorValues;
