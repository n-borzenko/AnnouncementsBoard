import React, { useState, useContext } from "react";

import AppContext from "../contexts/AppContext";
import AnnouncementsContext from "../contexts/AnnouncementsContext";
import announcementsActions from "../../constants/announcementsActions";
import Header from "../common/Header";
import FormContainer from "../form/FormContainer";
import formTemplate from "../../constants/formTemplate";
import appStates from "../../constants/appStates";
import appActions from "../../constants/appActions";

import "./AnnouncementForm.css";

const AnnouncementForm = () => {
  const [formId, setFormId] = useState(1);
  const announcementContext = useContext(AnnouncementsContext);
  const appContext = useContext(AppContext);
  const editing = appContext.state.state === appStates.editing;
  const values = editing
    ? announcementContext.state.values[appContext.state.id]
    : null;

  const handleSubmit = data => {
    const announcement = {
      title: data.title.value,
      phone: data.phone.value,
      text: data.text.value,
      photo: data.photo.value,
      city: data.city.value,
      lastUpdate: new Date(),
      id: editing ? values.id : null
    };

    setFormId(formId + 1);

    announcementContext.dispatch({
      type: editing ? announcementsActions.update : announcementsActions.add,
      payload: {
        value: announcement
      }
    });

    appContext.dispatch({
      type: appActions.create
    });
  };

  return (
    <div className="announcemenet-form">
      <div className="announcemenet-form__header">
        <Header>Подать объявление</Header>
      </div>
      <FormContainer
        template={formTemplate}
        values={values}
        onSubmit={handleSubmit}
        editing={editing}
        key={appContext.state.id || `tmp${formId}`}
      />
    </div>
  );
};

export default AnnouncementForm;
