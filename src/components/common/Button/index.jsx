import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";

import "./Button.css";

function renderIcons(iconType, type) {
  if (!iconType) {
    return null;
  }
  return (
    <>
      <span className="button__icon button__icon_white">
        <Icon type={iconType} color={Icon.colors.default} />
      </span>
      <span className="button__icon button__icon_colored">
        <Icon
          type={iconType}
          color={
            type === Button.types.destructive
              ? Icon.colors.destructive
              : Icon.colors.regular
          }
        />
      </span>
    </>
  );
}

const Button = props => {
  const className = classNames("button", {
    [`button_${props.type}`]: props.type !== Button.types.regular
  });

  return (
    <button
      type="button"
      className={className}
      onClick={props.onClick}
      name={name}
    >
      {renderIcons(props.iconType, props.type)}
      {props.children}
    </button>
  );
};

Button.types = {
  regular: "regular",
  destructive: "destructive"
};

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
