import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Input from "../../common/Input";
import MaskedInput from "../../common/MaskedInput";
import { formFieldsText } from "../../../constants/formFields";
import { phoneMask } from "../../../constants/phone";

const FormFieldText = ({ type, maxLength, focus, ...props }) => {
  const [focused, setFocused] = useState(focus);
  useEffect(() => {
    setFocused(focus);
  }, [focus]);

  switch (type) {
    case FormFieldText.types.text:
      return (
        <Input
          focus={focused}
          maxLength={maxLength}
          name={props.id}
          {...props}
        />
      );
    case FormFieldText.types.multiline:
      return (
        <Input
          focus={focused}
          multiline
          maxLength={maxLength}
          name={props.id}
          {...props}
        />
      );
    case FormFieldText.types.phone:
      return (
        <MaskedInput
          focus={focused}
          mask={phoneMask}
          name={props.id}
          {...props}
        />
      );
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
  onBlur: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

FormFieldText.defaultProps = {
  required: false,
  invalid: false,
  focus: false
};

export default FormFieldText;
