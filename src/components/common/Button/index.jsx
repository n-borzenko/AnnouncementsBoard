import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";
import buttonTypes from "../../../constants/buttonTypes";

import "./Button.css";

function renderIcons(iconType, type) {
  if (!iconType) {
    return null;
  }
  return (
    <>
      <span className="button__icon button__icon_white">
        <Icon type={iconType} />
      </span>
      <span className="button__icon button__icon_colored">
        <Icon type={iconType} color={type} />
      </span>
    </>
  );
}

const Button = props => {
  const { type, iconType } = props;
  const className = classNames("button", `button_${type}`);

  return (
    <button
      type="button"
      className={className}
      onClick={props.onClick}
      name={props.name}
    >
      {renderIcons(iconType, type)}
      {props.children}
    </button>
  );
};

Button.types = buttonTypes;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(Button.types)).isRequired,
  children: PropTypes.node.isRequired,
  iconType: PropTypes.oneOf(Object.values(Icon.types)),
  name: PropTypes.string
};

Button.defaultProps = {
  type: Button.types.regular
};

export default Button;
