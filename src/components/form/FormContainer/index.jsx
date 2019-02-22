import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import Form from "../Form";
import formFields, { formFieldsText } from "../../../constants/formFields";
import validate from "../../../helpers/validation";

const createInitialState = (template, values) => {
  return template.reduce((state, field) => {
    if (field.formField === formFields.submit) {
      return state;
    }
    const value = values && values[field.id] ? values[field.id] : null;
    state[field.id] = {
      value,
      validation: validate(value, field, true)
    };
    return state;
  }, {});
};

const fullValidation = (data, template) => {
  return template.reduce((newData, field) => {
    if (
      !data[field.id] ||
      (data[field.id].validation && !data[field.id].validation.valid)
    ) {
      return newData;
    }
    const validation = validate(data[field.id].value, field);
    newData[field.id] = { value: data[field.id].value, validation };
    return newData;
  }, {});
};

const FormContainer = props => {
  const initialState = useMemo(
    () => createInitialState(props.template, props.values),
    [props.template, props.values]
  );
  const [data, setData] = useState(initialState);
  const [forceValidation, setForceValidation] = useState(props.editing);
  const [focusId, setFocusId] = useState(null);
  useEffect(() => {
    setFocusId(props.template[0].id);
  }, []);

  const updateData = (id, value) => {
    const templateField = props.template.find(field => field.id === id);
    const validation = validate(value, templateField);
    const newData = {
      ...data,
      [id]: { value, validation }
    };
    setData(newData);
    setFocusId(null);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // first full validation
    let currentData = data;
    if (!forceValidation) {
      setForceValidation(true);
      const newData = fullValidation(data, props.template);

      // if errors found
      if (Object.keys(newData).length) {
        currentData = { ...data, ...newData };
        setData(currentData);
      }
    }

    // search first invalid field
    const invalidField = props.template.find(
      field =>
        currentData[field.id] &&
        (!currentData[field.id].validation ||
          !currentData[field.id].validation.valid)
    );

    if (invalidField) {
      setFocusId(invalidField.id);
      return;
    }

    // send correct data
    props.onSubmit(currentData);
  };
  return (
    <Form
      template={props.template}
      data={data}
      updateData={updateData}
      onSubmit={handleSubmit}
      editing={props.editing}
      focusId={focusId}
    />
  );
};

FormContainer.propTypes = {
  values: PropTypes.object,
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
  editing: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

FormContainer.defaultProps = {
  editing: false
};

export default FormContainer;
