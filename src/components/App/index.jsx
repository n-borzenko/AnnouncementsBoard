import React from "react";

import Button from "../common/Button";
import Icon from "../common/Icon";
import PrimaryButton from "../common/PrimaryButton";

const App = () => {
  return (
    <div>
      App
      <br />
      <Button iconType={Icon.types.clip}>Прикрепить фото</Button>
      <Button>Редактировать</Button>
      <Button type={Button.types.destructive}>Удалить</Button>
      <PrimaryButton value="Подать" />
    </div>
  );
};

export default App;
