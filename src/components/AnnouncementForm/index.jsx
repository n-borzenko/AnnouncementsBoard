import React, { useState, useContext } from "react";

import AnnouncementsContext from "../AnnouncementsContext";
import announcementsActions from "../../constants/announcementsActions";
import Header from "../common/Header";
import Form from "../common/Form";
import formTemplate from "../../constants/formTemplate";
import formFields from "../../constants/formFields";
import validate from "../../helpers/validation";

import "./AnnouncementForm.css";

const initialState = formTemplate.reduce((state, field) => {
  if (field.formField === formFields.submit) {
    return state;
  }
  state[field.id] = { value: null, validation: null };
  return state;
}, {});

const AnnouncementForm = () => {
  const { dispatch } = useContext(AnnouncementsContext);
  const editing = false;
  const [forceValidation, setForceValidation] = useState(editing);
  const [data, setData] = useState({ ...initialState });

  const updateData = (id, value) => {
    const template = formTemplate.find(field => field.id === id);
    const validation = validate(value, template);
    const newData = {
      ...data,
      [id]: { value, validation }
    };
    setData(newData);
  };

  // if (
  //   !props.validation ||
  //   (props.forceValidation && !props.validation.forced)
  // ) {
  //   const validation = validate(props.value, !props.forceValidation);
  //   props.onValidate(props.value, validation);
  // }

  const handleSubmit = e => {
    e.preventDefault();

    // first full validation
    let currentData = data;
    if (!forceValidation) {
      setForceValidation(true);
      formTemplate.reduce((newData, field) => {
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
      if (Object.keys(newData).length) {
        currentData = { ...data, ...newData };
        setData(currentData);
      }
    }

    // search first invalid field
    const invalidFieldId = formTemplate.find(
      field =>
        currentData[field.id] &&
        (!currentData[field.id].validation ||
          !currentData[field.id].validation.valid)
    );
    if (invalidFieldId) {
      console.log(`invalid ${invalidFieldId}`);
      console.log(data);
      console.log(currentData);
      //focus ?
      return;
    }

    // save announcement
    const announcement = {
      title: data.title.value,
      lastUpdate: new Date()
    };

    dispatch({
      type: announcementsActions.add,
      payload: {
        value: announcement
      }
    });
    setData({ ...initialState });
  };

  return (
    <div className="announcemenet-form">
      <div className="announcemenet-form__header">
        <Header>Подать объявление</Header>
      </div>
      <Form
        template={formTemplate}
        data={data}
        updateData={updateData}
        onSubmit={handleSubmit}
        editing={editing}
      />
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
