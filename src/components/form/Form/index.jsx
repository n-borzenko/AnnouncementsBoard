import React from "react";
import PropTypes from "prop-types";

import FormField from "../FormField";
import FormFieldText from "../FormFieldText";
import PrimaryButton from "../../common/PrimaryButton";
import Selector from "../../common/Selector";
import PhotoLoader from "../../photo/PhotoLoader";
import formFields, { formFieldsText } from "../../../constants/formFields";
import validationTypes from "../../../constants/validationTypes";

import "./Form.css";

const renderText = (field, data, onBlur, focusId) => {
  return (
    <FormFieldText
      value={data.value}
      invalid={data.validation ? !data.validation.valid : false}
      onBlur={onBlur}
      focus={focusId === field.id}
      {...field}
    />
  );
};

const renderPhoto = (field, data, onChange, focusId) => {
  return (
    <PhotoLoader
      name={field.id}
      id={field.id}
      photo={data.value}
      buttonTitle={field.buttonTitle}
      onChange={onChange}
      focus={focusId === field.id}
    />
  );
};

const renderSelector = (field, data, onChange, focusId) => {
  return (
    <Selector
      values={field.values}
      value={data.value}
      id={field.id}
      name={field.id}
      invalid={data.validation ? !data.validation.valid : false}
      onChange={onChange}
      focus={focusId === field.id}
    />
  );
};

const renderSubmit = (field, editing) => {
  return (
    <PrimaryButton>
      {editing ? field.editingTitle : field.buttonTitle}
    </PrimaryButton>
  );
};

const renderFieldContent = (field, data, updateData, editing, focusId) => {
  switch (field.formField) {
    case formFields.text:
      return renderText(
        field,
        data[field.id],
        value => updateData(field.id, value),
        focusId
      );
    case formFields.photo:
      return renderPhoto(
        field,
        data[field.id],
        value => updateData(field.id, value),
        focusId
      );
    case formFields.selector:
      return renderSelector(
        field,
        data[field.id],
        value => updateData(field.id, value),
        focusId
      );
    case formFields.submit:
      return renderSubmit(field, editing);
    default:
      return null;
  }
};

const Form = ({ template, data, updateData, editing, onSubmit, focusId }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      {template.map(field => (
        <div className="form__field" key={field.id}>
          <FormField
            id={field.id}
            title={field.title}
            validation={data[field.id] ? data[field.id].validation : null}
          >
            {renderFieldContent(field, data, updateData, editing, focusId)}
          </FormField>
        </div>
      ))}
    </form>
  );
};

Form.propTypes = {
  template: PropTypes.arrayOf(
    PropTypes.shape({
      formField: PropTypes.oneOf(Object.values(formFields)).isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(formFieldsText)),
      title: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      maxLength: PropTypes.number,
      editingTitle: PropTypes.string,
      buttonTitle: PropTypes.string
    }).isRequired
  ).isRequired,
  data: PropTypes.objectOf(
    PropTypes.shape({
      value: PropTypes.any,
      validation: PropTypes.shape({
        message: PropTypes.string,
        valid: PropTypes.bool.isRequired,
        type: PropTypes.oneOf(Object.values(validationTypes)).isRequired
      })
    })
  ).isRequired,
  updateData: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  focusId: PropTypes.string
};

Form.defaultProps = {
  editing: false
};

export default Form;
