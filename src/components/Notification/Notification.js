import React, { useState } from "react";
import Activity from "./Activity";
import Broadcast from "./Broadcast";

import "./Notification.css";
import NotificationSwitch from "./NotificationSwitch";

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
      <NotificationSwitch section={section} setSection={setSection} />
      {getSection(section)}
    </div>
  );
}

export default Notification;
