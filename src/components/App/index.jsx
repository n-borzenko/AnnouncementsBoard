import React from "react";

import Button from "../common/Button";
import Icon from "../common/Icon";
import PrimaryButton from "../common/PrimaryButton";
import Input from "../common/Input";

const App = () => {
  return (
    <div>
      App
      <br />
      <Input maxLength={5} />
      <Input invalid />
      <Input multiline />
      <Button iconType={Icon.types.clip}>Прикрепить фото</Button>
      <Button>Редактировать</Button>
      <Button type={Button.types.destructive}>Удалить</Button>
      <PrimaryButton>Подать</PrimaryButton>
    </div>
  );
};

export default App;
