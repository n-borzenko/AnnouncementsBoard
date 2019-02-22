import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "../common/Header";
import FormFieldText from "../common/FormFieldText";
import PrimaryButton from "../common/PrimaryButton";
import formTemplate from "../../constants/formTemplate";
import formFields from "../../constants/formFields";

import "./AnnouncementForm.css";

const renderFormFieldText = (field, data, onValidate, editing) => {
  return (
    <FormFieldText
      value={data.value}
      validation={data.validation}
      onValidate={onValidate}
      {...field}
      editing={editing}
    />
  );
};

const renderFormFieldSubmit = (field, editing) => {
  return (
    <PrimaryButton>{editing ? field.editingTitle : field.title}</PrimaryButton>
  );
};

const renderFormField = (field, data, updateData, editing) => {
  switch (field.formField) {
    case formFields.text:
      return renderFormFieldText(
        field,
        data[field.id],
        (value, validation) => updateData(field.id, value, validation),
        editing
      );
    case formFields.submit:
      return renderFormFieldSubmit(field, editing);
    default:
      return null;
  }
};

const AnnouncementForm = () => {
  const editing = false;
  const [data, setData] = useState({
    title: { value: null, validation: null },
    text: { value: null, validation: null },
    phone: { value: null, validation: null }
  });

  const updateData = (id, value, validation) => {
    const newData = {
      ...data,
      [id]: { value, validation }
    };
    setData(newData);
  };

  const handleSubmit = e => {
    console.log("works");
    e.preventDefault();
  };

  return (
    <div className="announcemenet-form">
      <div className="announcemenet-form__header">
        <Header>Подать объявление</Header>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {formTemplate.map(field => (
          <div className="form__field" key={field.id}>
            {renderFormField(field, data, updateData, editing)}
          </div>
        ))}
      </form>
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
