import React from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import MaskedInput from "../MaskedInput";
import ValidationMessage from "../ValidationMessage";
import validationMessages from "../../../constants/validationMessages";
import validationTypes from "../../../constants/validationTypes";
import { formFieldsText } from "../../../constants/formFields";

import "./FormFieldText.css";

const phoneMask = "+7 (___) ___-__-__";
const phoneRegex = /^[+]7 [(][\d]{3}[)] [\d]{3}[-][\d]{2}-[\d]{2}$/;

const renderInput = (type, id, validation, onBlur, value, maxLength) => {
  const props = {
    value: value || "",
    id,
    name: id,
    onBlur,
    invalid: validation ? !validation.valid : false
  };
  switch (type) {
    case FormFieldText.types.text:
      return <Input maxLength={maxLength} {...props} />;
    case FormFieldText.types.multiline:
      return <Input multiline maxLength={maxLength} {...props} />;
    case FormFieldText.types.phone:
      return <MaskedInput mask={phoneMask} {...props} />;
  }
};

const renderMessage = validation => {
  if (!validation || !validation.message || !validation.message.length) {
    return null;
  }
  return (
    <ValidationMessage type={validation.type}>
      {validation.message}
    </ValidationMessage>
  );
};

const FormFieldText = props => {
  const validate = (newValue, skipErrors = false) => {
    let message = props.description;
    let valid = true;
    let type = validationTypes.info;

    if (skipErrors) {
      return { message, valid, type };
    }

    switch (props.type) {
      case FormFieldText.types.text:
      case FormFieldText.types.multiline:
        {
          if (newValue && newValue.length) {
            if (props.maxLength) {
              valid = newValue.length <= props.maxLength;
              message = valid
                ? validationMessages.filled
                : validationMessages.maxLength.replace("#", props.maxLength);
              type = valid ? validationTypes.success : validationTypes.error;
            } else {
              message = validationMessages.filled;
              type = validationTypes.success;
            }
          } else {
            valid = !props.required;
            message = valid ? props.description : validationMessages.required;
            type = valid ? validationTypes.info : validationTypes.error;
          }
        }
        break;
      case FormFieldText.types.phone:
        {
          if (newValue && newValue.length && newValue !== phoneMask) {
            valid = phoneRegex.test(newValue);
            message = valid
              ? validationMessages.filled
              : validationMessages.format;
            type = valid ? validationTypes.success : validationTypes.error;
          } else {
            valid = !props.required;
            message = valid ? props.description : validationMessages.required;
            type = valid ? validationTypes.info : validationTypes.error;
          }
        }
        break;
    }
    return { message, valid, type };
  };

  const handleBlur = newValue => {
    const validation = validate(newValue);
    props.onValidate(newValue, validation);
  };

  if (!props.validation) {
    const validation = validate(props.value, !props.editing);
    props.onValidate(props.value, validation);
  }

  return (
    <div className="form-field-text">
      <div className="form-field-text__title">
        <label htmlFor={props.id}>{props.title}</label>
      </div>
      <div className="form-field-text__container">
        {renderInput(
          props.type,
          props.id,
          props.validation,
          handleBlur,
          props.value,
          props.maxLength
        )}
        <div className="form-field-text__info">
          {renderMessage(props.validation)}
        </div>
      </div>
    </div>
  );
};

FormFieldText.types = formFieldsText;

FormFieldText.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(FormFieldText.types)).isRequired,
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool.isRequired,
  maxLength: PropTypes.number,
  validation: PropTypes.shape({
    message: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.values(validationTypes)).isRequired
  }),
  onValidate: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

FormFieldText.defaultProps = {
  required: false,
  editing: false
};

export default FormFieldText;
