import formFields, { formFieldsText } from "./formFields";

export default [
  {
    formField: formFields.text,
    id: "title",
    type: formFieldsText.text,
    title: "Заголовок",
    description: "Обязательное поле\r\nНе более 140 символов",
    required: true,
    maxLength: 140
  },
  {
    formField: formFields.text,
    id: "text",
    type: formFieldsText.multiline,
    title: "Текст объявления",
    description: "Не более 300 символов",
    maxLength: 300
  },
  {
    formField: formFields.text,
    id: "phone",
    type: formFieldsText.phone,
    title: "Телефон",
    description: "Обязательное поле",
    required: true
  },
  {
    formField: formFields.photo,
    id: "photo",
    buttonTitle: "Прикрепить фото"
  },
  {
    formField: formFields.submit,
    buttonTitle: "Подать",
    editingTitle: "Обновить",
    id: "submit"
  }
];
