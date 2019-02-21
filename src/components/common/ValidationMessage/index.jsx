import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import validationTypes from "../../../constants/validationTypes";
import Icon from "../Icon";

import "./ValidationMessage.css";

const ValidationMessage = ({ type, children }) => {
  const className = classNames(
    "validation-message",
    `validation-message_${type}`
  );
  return (
    <div className={className}>
      <div className="validation-message__icon">
        <Icon type={type} />
      </div>
      <span className="validation-message__text">{children}</span>
    </div>
  );
};

ValidationMessage.types = validationTypes;

ValidationMessage.propTypes = {
  type: PropTypes.oneOf(Object.values(ValidationMessage.types)).isRequired,
  children: PropTypes.node.isRequired
};

ValidationMessage.defaultProps = {
  type: ValidationMessage.info
};

export default ValidationMessage;
