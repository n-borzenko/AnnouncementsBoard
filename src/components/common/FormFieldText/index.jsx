import React from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import MaskedInput from "../MaskedInput";
import { formFieldsText } from "../../../constants/formFields";
import { phoneMask } from "../../../constants/phone";

const FormFieldText = ({ type, maxLength, ...props }) => {
  switch (type) {
    case FormFieldText.types.text:
      return <Input maxLength={maxLength} name={props.id} {...props} />;
    case FormFieldText.types.multiline:
      return (
        <Input multiline maxLength={maxLength} name={props.id} {...props} />
      );
    case FormFieldText.types.phone:
      return <MaskedInput mask={phoneMask} name={props.id} {...props} />;
  }
};

FormFieldText.types = formFieldsText;

FormFieldText.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(FormFieldText.types)).isRequired,
  value: PropTypes.string,
  required: PropTypes.bool.isRequired,
  maxLength: PropTypes.number,
  invalid: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired
};

FormFieldText.defaultProps = {
  required: false,
  invalid: false
};

export default FormFieldText;
