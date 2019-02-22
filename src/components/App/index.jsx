import React from "react";

import AnnouncementForm from "../AnnouncementForm";
import { AnnouncementsProvider } from "../contexts/AnnouncementsContext";
import { AppProvider } from "../contexts/AppContext";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <AppProvider>
          <AnnouncementsProvider>
            <AnnouncementForm />
          </AnnouncementsProvider>
        </AppProvider>
      </div>
    </div>
  );
};

export default App;
