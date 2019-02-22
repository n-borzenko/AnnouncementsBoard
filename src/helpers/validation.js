import validationTypes from "../constants/validationTypes";
import validationMessages from "../constants/validationMessages";
import { phoneMask, phoneRegex } from "../constants/phone";
import formFields, { formFieldsText } from "../constants/formFields";

const validateText = (newValue, template, skipErrors = false) => {
  let message = template.description;
  let valid = true;
  let type = validationTypes.info;
  let forced = false;

  if (skipErrors) {
    return { message, valid, type, forced };
  }

  forced = true;
  switch (template.type) {
    case formFieldsText.text:
    case formFieldsText.multiline:
      {
        if (newValue && newValue.length) {
          if (template.maxLength) {
            valid = newValue.length <= template.maxLength;
            message = valid
              ? validationMessages.filled
              : validationMessages.maxLength.replace("#", template.maxLength);
            type = valid ? validationTypes.success : validationTypes.error;
          } else {
            message = validationMessages.filled;
            type = validationTypes.success;
          }
        } else {
          valid = !template.required;
          message = valid ? template.description : validationMessages.required;
          type = valid ? validationTypes.info : validationTypes.error;
        }
      }
      break;
    case formFieldsText.phone:
      {
        if (newValue && newValue.length && newValue !== phoneMask) {
          valid = phoneRegex.test(newValue);
          message = valid
            ? validationMessages.filled
            : validationMessages.format;
          type = valid ? validationTypes.success : validationTypes.error;
        } else {
          valid = !template.required;
          message = valid ? template.description : validationMessages.required;
          type = valid ? validationTypes.info : validationTypes.error;
        }
      }
      break;
  }
  return { message, valid, type, forced };
};

const validate = (value, template, skipErrors = false) => {
  switch (template.formField) {
    case formFields.text:
      return validateText(value, template, skipErrors);
    default:
      return null;
  }
};

export default validate;
