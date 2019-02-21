import React from "react";
import PropTypes from "prop-types";

import Header from "../common/Header";

import ValidationMessage from "../common/ValidationMessage";
import Input from "../common/Input";
import MaskedInput from "../common/MaskedInput";
import Button from "../common/Button";
import PrimaryButton from "../common/PrimaryButton";
import Icon from "../common/Icon";

import "./AnnouncementForm.css";

const AnnouncementForm = props => {
  return (
    <div className="announcemenet-form">
      <Header>Подать объявление</Header>

      <ValidationMessage type={ValidationMessage.types.success}>
        140 символов
        <br />
        1214124kj23kjhr2
      </ValidationMessage>
      <Input maxLength={15} />
      <Input invalid />
      <MaskedInput mask="+7 (___) ___-__-__" />
      <br />
      <br />
      <Input multiline />
      <Button iconType={Icon.types.clip}>Прикрепить фото</Button>
      <Button>Редактировать</Button>
      <Button type={Button.types.destructive}>Удалить</Button>
      <PrimaryButton>Подать</PrimaryButton>
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
