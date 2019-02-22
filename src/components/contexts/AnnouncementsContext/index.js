import React, { useReducer, useEffect } from "react";

import announcementsActions from "../../../constants/announcementsActions";
import announcementsKey from "../../../constants/announcementsKey";
import { setToStorage, getFromStorage } from "../../../helpers/storage";

const AnnouncementsContext = React.createContext();

const initialState = getFromStorage(announcementsKey, {
  ids: [],
  values: {}
});

Object.keys(initialState.values).forEach(id => {
  initialState.values[id].lastUpdate = new Date(
    initialState.values[id].lastUpdate
  );
});

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

  useEffect(() => {
    setToStorage(announcementsKey, state);
  }, [state]);

  const value = { state, dispatch };
  return (
    <AnnouncementsContext.Provider value={value}>
      {props.children}
    </AnnouncementsContext.Provider>
  );
};

export const AnnouncementsConsumer = AnnouncementsContext.Consumer;

export default AnnouncementsContext;
