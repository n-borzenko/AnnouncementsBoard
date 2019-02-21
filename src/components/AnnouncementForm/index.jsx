import React from "react";
import PropTypes from "prop-types";

import Header from "../common/Header";
import FormFieldText from "../common/FormFieldText";

// import ValidationMessage from "../common/ValidationMessage";
// import Input from "../common/Input";
// import MaskedInput from "../common/MaskedInput";
// import Button from "../common/Button";
// import PrimaryButton from "../common/PrimaryButton";
// import Icon from "../common/Icon";

import "./AnnouncementForm.css";

const AnnouncementForm = props => {
  const data = {
    title: "",
    text: "",
    phone: ""
  };

  return (
    <div className="announcemenet-form">
      <div className="announcemenet-form__header">
        <Header>Подать объявление</Header>
      </div>
      <div className="form">
        <div className="form__field">
          <FormFieldText
            id="title"
            type={FormFieldText.types.text}
            value={data["title"]}
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
            value={data["text"]}
            title="Текст объявления"
            description="Не более 300 символов"
            maxLength={300}
          />
        </div>
        <div className="form__field">
          <FormFieldText
            id="phone"
            type={FormFieldText.types.phone}
            value={data["phone"]}
            title="Телефон"
            description="Обязательное поле"
            required
          />
        </div>
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
