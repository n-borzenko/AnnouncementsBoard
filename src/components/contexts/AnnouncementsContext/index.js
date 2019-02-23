import React, { useReducer, useEffect, useState } from "react";

import announcementsActions from "../../../constants/announcementsActions";
import {
  saveAnnouncements,
  readAnnouncements
} from "../../../helpers/announcementsSaver";

const AnnouncementsContext = React.createContext();

const initialState = readAnnouncements();

const reducer = (state, action) => {
  switch (action.type) {
    case announcementsActions.add: {
      let { value } = action.payload;
      const newId = Math.max(...state.ids, 0) + 1;
      value.id = newId;
      const values = { ...state.values, [newId]: value };
      const ids = [...state.ids, newId].sort(
        (a, b) =>
          -(values[a].lastUpdate.getTime() - values[b].lastUpdate.getTime())
      );
      return { ids, values };
    }
    case announcementsActions.update: {
      let { value } = action.payload;
      const values = { ...state.values, [value.id]: value };
      const ids = [...state.ids].sort(
        (a, b) =>
          -(values[a].lastUpdate.getTime() - values[b].lastUpdate.getTime())
      );
      return { ids, values };
    }
    case announcementsActions.delete: {
      const values = { ...state.values };
      delete values[action.payload.id];
      const ids = state.ids.filter(id => id !== action.payload.id);
      return { ids, values };
    }
  }
};

export const AnnouncementsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [savedId, setSavedId] = useState(0);

  const handleDispatch = action => {
    switch (action.type) {
      case announcementsActions.add:
        setSavedId(Math.max(...state.ids, 0) + 1);
        break;
      case announcementsActions.update:
        setSavedId(action.payload.value.id);
        break;
      case announcementsActions.delete:
        setSavedId(action.payload.id);
        break;
    }
    dispatch(action);
  };

  useEffect(() => {
    saveAnnouncements(state, savedId);
  }, [state, savedId]);

  const value = { state, dispatch: handleDispatch };
  return (
    <AnnouncementsContext.Provider value={value}>
      {props.children}
    </AnnouncementsContext.Provider>
  );
};

export const AnnouncementsConsumer = AnnouncementsContext.Consumer;

export default AnnouncementsContext;
