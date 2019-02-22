import React, { useReducer, useEffect } from "react";

import appActions from "../../../constants/appActions";
import appStates from "../../../constants/appStates";

const AppContext = React.createContext();

const initialState = {
  state: appStates.creating,
  id: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case appActions.create: {
      return { state: appStates.creating, id: null };
    }
    case appActions.edit: {
      return { state: appStates.editing, id: action.payload.id };
    }
  }
};

export const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const AppConsumer = AppContext.Consumer;

export default AppContext;
