import React, { useContext } from "react";

import AnnouncementsContext from "../AnnouncementsContext";
import announcementsActions from "../../constants/announcementsActions";
import Header from "../common/Header";
import FormContainer from "../form/FormContainer";
import formTemplate from "../../constants/formTemplate";

import "./AnnouncementForm.css";

const AnnouncementForm = () => {
  const { dispatch } = useContext(AnnouncementsContext);
  const values = null;
  const editing = false;

  const handleSubmit = data => {
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
      />
    </div>
  );
};

AnnouncementForm.propTypes = {};

export default AnnouncementForm;
