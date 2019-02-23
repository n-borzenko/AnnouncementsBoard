import validationTypes from "../constants/validationTypes";
import validationMessages from "../constants/validationMessages";
import { phoneMask, phoneRegex } from "../constants/phone";
import formFields, { formFieldsText } from "../constants/formFields";

const validateText = (newValue, template, skipErrors = false) => {
  let message = template.description;
  let valid = true;
  let type = validationTypes.info;

  if (skipErrors) {
    return { message, valid, type };
  }

  switch (template.type) {
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
    default:
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
  }
  return { message, valid, type };
};

const validatePhoto = (newValue, template, skipErrors = false) => {
  let message = template.description;
  let valid = true;
  let type = validationTypes.info;

  if (skipErrors) {
    return { message, valid, type };
  }

  if (template.required) {
    valid = newValue !== null;
    message = valid ? validationMessages.filled : validationMessages.required;
    type = valid ? validationTypes.success : validationTypes.error;
  }
  return { message, valid, type };
};

const validate = (value, template, skipErrors = false) => {
  switch (template.formField) {
    case formFields.selector:
    case formFields.text:
      return validateText(value, template, skipErrors);
    case formFields.photo:
      return validatePhoto(value, template, skipErrors);
    default:
      return null;
  }
};

export default validate;
