import React from "react";
import PropTypes from "prop-types";

import ValidationMessage from "../../common/ValidationMessage";
import validationTypes from "../../../constants/validationTypes";

import "./FormField.css";

const renderTitle = (title, id) => {
  if (!title || !title.length) {
    return null;
  }
  return (
    <div className="form-field__title">
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

const renderMessage = validation => {
  if (!validation || !validation.message || !validation.message.length) {
    return null;
  }
  return (
    <div className="form-field__info">
      <ValidationMessage type={validation.type}>
        {validation.message}
      </ValidationMessage>
    </div>
  );
};

const FormField = props => {
  return (
    <div className="form-field">
      {renderTitle(props.title, props.id)}
      <div className="form-field__container">
        <div className="form-field__item">{props.children}</div>
        {renderMessage(props.validation)}
      </div>
    </div>
  );
};

FormField.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  validation: PropTypes.shape({
    message: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.values(validationTypes)).isRequired
  })
};

export default FormField;
