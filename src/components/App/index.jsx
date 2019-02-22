import React from "react";

import AnnouncementForm from "../AnnouncementForm";
import { AnnouncementsProvider } from "../AnnouncementsContext";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <AnnouncementsProvider>
          <AnnouncementForm />
        </AnnouncementsProvider>
      </div>
    </div>
  );
};

export default App;
