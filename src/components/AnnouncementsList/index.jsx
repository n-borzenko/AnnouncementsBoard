import React, { useContext } from "react";

import AppContext from "../contexts/AppContext";
import AnnouncementsContext from "../contexts/AnnouncementsContext";
import announcementsActions from "../../constants/announcementsActions";
import Header from "../common/Header";
import appActions from "../../constants/appActions";
import Announcement from "../Announcement";

import "./AnnouncementsList.css";

const renderAnnouncements = (state, handleEdit, handleDelete) => {
  return (
    <div className="announcemenets-list__items">
      {state.ids.map(id => (
        <div className="announcemenets-list__item" key={id}>
          <Announcement
            onDelete={handleDelete}
            onEdit={handleEdit}
            {...state.values[id]}
          />
        </div>
      ))}
    </div>
  );
};

const AnnouncementsList = () => {
  const announcementContext = useContext(AnnouncementsContext);
  const appContext = useContext(AppContext);

  const handleDelete = id => {
    announcementContext.dispatch({
      type: announcementsActions.delete,
      payload: {
        id
      }
    });
  };

  const handleEdit = id => {
    appContext.dispatch({
      type: appActions.edit,
      payload: {
        id
      }
    });
  };

  return (
    <div className="announcemenets-list">
      <div className="announcemenets-list__header">
        <Header>Объявления</Header>
        {renderAnnouncements(
          announcementContext.state,
          handleEdit,
          handleDelete
        )}
      </div>
    </div>
  );
};

AnnouncementsList.propTypes = {};

export default AnnouncementsList;
