import React, { useState } from "react";

import Button from "../common/Button";
import Icon from "../common/Icon";
import PrimaryButton from "../common/PrimaryButton";
import Input from "../common/Input";
import ValidationMessage from "../common/ValidationMessage";
import MaskedInput from "../common/MaskedInput";

const App = () => {
  const [value, setValue] = useState("");
  const [valid, setValidity] = useState(true);
  const handleChange = newValue => {
    setValue(newValue);
    setValidity(newValue.startsWith("12"));
  };

  return (
    <div>
      App
      <br />
      <ValidationMessage type={ValidationMessage.types.success}>
        140 символов
        <br />
        1214124kj23kjhr2
      </ValidationMessage>
      <Input
        maxLength={15}
        value={value}
        invalid={!valid}
        onChange={handleChange}
      />
      <br />
      {value}
      <br />
      <Input invalid />
      <MaskedInput mask="+7 (___) ___-__-__" />
      <Input multiline />
      <Button iconType={Icon.types.clip}>Прикрепить фото</Button>
      <Button>Редактировать</Button>
      <Button type={Button.types.destructive}>Удалить</Button>
      <PrimaryButton>Подать</PrimaryButton>
    </div>
  );
};

export default App;
