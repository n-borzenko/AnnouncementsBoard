import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";

import "./Button.css";

const Button = props => {
  const className = classNames("button", {
    [`button_${props.type}`]: props.type !== Button.types.regular
  });

  const icons = props.iconType ? (
    <>
      <span className="button__icon button__icon_white">
        <Icon type={props.iconType} color={Icon.colors.default} />
      </span>
      <span className="button__icon button__icon_colored">
        <Icon
          type={props.iconType}
          color={
            props.type === Button.types.destructive
              ? Icon.colors.destructive
              : Icon.colors.regular
          }
        />
      </span>
    </>
  ) : null;

  return (
    <button className={className} onClick={props.onClick}>
      {icons}
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
  iconType: PropTypes.oneOf(Object.values(Icon.types))
};

Button.defaultProps = {
  type: Button.types.regular
};

export default Button;
