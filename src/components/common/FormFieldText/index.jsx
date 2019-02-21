import React from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import MaskedInput from "../MaskedInput";
import ValidationMessage from "../ValidationMessage";

import "./FormFieldText.css";

const renderInput = (type, id, valid, onChange, value, maxLength) => {
  const props = {
    value,
    id,
    name: id,
    onChange,
    invalid: !valid
  };
  switch (type) {
    case FormFieldText.types.text:
      return <Input maxLength={maxLength} {...props} />;
    case FormFieldText.types.multiline:
      return <Input multiline maxLength={maxLength} {...props} />;
    case FormFieldText.types.phone:
      return <MaskedInput mask="+7 (___) ___-__-__" {...props} />;
  }
};

const renderMessage = (valid, description, error) => {
  if (!description || !description.length) {
    return null;
  }
  return (
    <ValidationMessage type={ValidationMessage.types.info}>
      {description}
    </ValidationMessage>
  );
};

const FormFieldText = props => {
  const valid = true;
  const firstInput = true;

  const handleChange = newValue => {
    console.log(newValue);
  };

  return (
    <div className="form-field-text">
      <div className="form-field-text__title">
        <label htmlFor={props.id}>{props.title}</label>
      </div>
      <div className="form-field-text__container">
        {renderInput(
          props.type,
          props.id,
          valid,
          handleChange,
          props.value,
          props.maxLength
        )}
        <div className="form-field-text__info">
          {renderMessage(valid, props.description)}
        </div>
      </div>
    </div>
  );
};

FormFieldText.types = {
  text: "text",
  multiline: "multiline",
  phone: "phone"
};

FormFieldText.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(FormFieldText.types)).isRequired,
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  decription: PropTypes.string,
  required: PropTypes.bool.isRequired,
  maxLength: PropTypes.number
};

FormFieldText.defaultProps = {
  required: false
};

export default FormFieldText;
