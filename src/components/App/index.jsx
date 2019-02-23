import React from "react";

import AnnouncementForm from "../AnnouncementForm";
import AnnouncementsList from "../AnnouncementsList";
import { AnnouncementsProvider } from "../contexts/AnnouncementsContext";
import { AppProvider } from "../contexts/AppContext";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <AppProvider>
          <AnnouncementsProvider>
            <div className="app__form">
              <AnnouncementForm />
            </div>
            <div className="app__list">
              <AnnouncementsList />
            </div>
          </AnnouncementsProvider>
        </AppProvider>
      </div>
    </div>
  );
};

export default App;
