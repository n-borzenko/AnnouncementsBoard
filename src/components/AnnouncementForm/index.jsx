import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "../common/Header";
import FormFieldText from "../common/FormFieldText";
import formTemplate from "../../constants/formTemplate";
import formFields from "../../constants/formFields";

import "./AnnouncementForm.css";

const renderFormFieldText = (field, data, onValidate) => {
  return (
    <FormFieldText
      value={data.value}
      validation={data.validation}
      onValidate={onValidate}
      {...field}
    />
  );
};

const renderFormFieldSubmit = () => {
  return null;
};

const renderFormField = (field, data, updateData) => {
  switch (field.formField) {
    case formFields.text:
      return renderFormFieldText(field, data[field.id], (value, validation) =>
        updateData(field.id, value, validation)
      );
    case formFields.submit:
      return renderFormFieldSubmit(field);
    default:
      return null;
  }
};

const AnnouncementForm = () => {
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

  return (
    <div className="announcemenet-form">
      <div className="announcemenet-form__header">
        <Header>Подать объявление</Header>
      </div>
      <div className="form">
        {formTemplate.map(field => (
          <div className="form__field" key={field.id}>
            {renderFormField(field, data, updateData)}
          </div>
        ))}
        {/* <div className="form__field">
          <FormFieldText
            id="title"
            type={FormFieldText.types.text}
            value={data["title"].value}
            validation={data["title"].validation}
            title="Заголовок"
            description="Обязательное поле&#13;&#10;Не более 140 символов"
            required
            maxLength={140}
          />
        </div>
        <div className="form__field">
          <FormFieldText
            id="text"
            type={FormFieldText.types.multiline}
            value={data["text"].value}
            validation={data["text"].validation}
            title="Текст объявления"
            description="Не более 300 символов"
            maxLength={300}
          />
        </div>
        <div className="form__field">
          <FormFieldText
            id="phone"
            type={FormFieldText.types.phone}
            value={data["phone"].value}
            validation={data["phone"].validation}
            title="Телефон"
            description="Обязательное поле"
            required
          />
        </div> */}
      </div>

      {/* <ValidationMessage type={ValidationMessage.types.success}>
        140 символов
        <br />
        1214124kj23kjhr2
      </ValidationMessage>
      <FormField>
        <Input id={123} maxLength={15} />
      </FormField>
      <br />
      <br />
      <Input invalid />
      <MaskedInput mask="+7 (___) ___-__-__" />

      <Input multiline />
      <Button iconType={Icon.types.clip}>Прикрепить фото</Button>
      <Button>Редактировать</Button>
      <Button type={Button.types.destructive}>Удалить</Button>
      <PrimaryButton>Подать</PrimaryButton> */}
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
