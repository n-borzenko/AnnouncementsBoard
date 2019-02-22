import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../../common/Icon";
import buttonTypes from "../../../constants/buttonTypes";

import "./FakeButton.css";

function renderIcons(iconType, type) {
  if (!iconType) {
    return null;
  }
  return (
    <>
      <span className="fake-button__icon fake-button__icon_white">
        <Icon type={iconType} />
      </span>
      <span className="fake-button__icon fake-button__icon_colored">
        <Icon type={iconType} color={type} />
      </span>
    </>
  );
}

const FakeButton = props => {
  const { type, iconType } = props;
  const className = classNames("fake-button", `fake-button_${type}`);

  return (
    <div type="fake-button" className={className} name={props.name}>
      {renderIcons(iconType, type)}
      {props.children}
    </div>
  );
};

FakeButton.types = buttonTypes;

FakeButton.propTypes = {
  type: PropTypes.oneOf(Object.values(FakeButton.types)).isRequired,
  children: PropTypes.node.isRequired,
  iconType: PropTypes.oneOf(Object.values(Icon.types)),
  name: PropTypes.string
};

FakeButton.defaultProps = {
  type: FakeButton.types.regular
};

export default FakeButton;
