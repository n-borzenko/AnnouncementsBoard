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
  const editing = appContext.state === appStates.editing;
  const values = editing
    ? announcementContext.state.values[appContext.state.id]
    : null;

  const handleSubmit = data => {
    const announcement = {
      title: data.title.value,
      phone: data.phone.value,
      text: data.text.value,
      lastUpdate: new Date()
    };

    setFormId(formId + 1);

    announcementContext.dispatch({
      type: announcementsActions.add,
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
        value={values}
        onSubmit={handleSubmit}
        editing={editing}
        key={appContext.id || `tmp${formId}`}
      />
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
