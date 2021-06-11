import React, { useState } from "react";
import Activity from "./Activity";
import Broadcast from "./Broadcast";

import "./Notification.css";
import BookIcon from "@material-ui/icons/Book";

import { Tab, Tabs as BaseTabs } from "../../baseUI/Tabs";
import styled from "styled-components";

//TODO: rename from Notification to a more suitable name

const Tabs = styled(BaseTabs)`
  margin-top: 0.6em;
  font-size: 1.2em;
  width: 27.5%;
`;

const getSection = (identifier) => {
  switch (identifier) {
    case 0:
      return <Activity />;
    case 1:
      return <Broadcast />;
    default:
      return false;
  }
};

function Notification() {
  const [section, setSection] = useState(0);

  return (
    <div className="notification">
      <Tabs>
        <Tab
          text="Activity"
          icon={<BookIcon />}
          checked={section === 0}
          onClick={() => setSection(0)}
        />
        <Tab
          text="Broadcast"
          icon={<i class="fas fa-bullhorn"></i>}
          checked={section === 1}
          onClick={() => setSection(1)}
        />
      </Tabs>
      {getSection(section)}
    </div>
  );
}

export default Notification;
