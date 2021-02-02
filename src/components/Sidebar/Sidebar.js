import React from "react";
import "./Sidebar.css";

import Button from "@material-ui/core/Button";
import ProfileImage from "../../assets/profileImage.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <i class="fas fa-calendar-week" id="logo"></i>
        <span className="sidebar__name">Trackr</span>
      </div>

      <div className="sidebar__profile">
        <div className="sidebar__profileImage">
          <img src={ProfileImage} alt="" />
        </div>
        <span className="sidebar__profileName">Shivam Singh</span>
        <span className="sidebar__profilePosition">ADMIN</span>
      </div>

      <div className="sidebar__links">
        <label className="sidebar__link">
          <i class="fas fa-chart-area"></i>
          <span className="sidebar__linkText">Dashboard</span>
        </label>
        <label className="sidebar__link">
          <i class="fas fa-user-graduate"></i>
          <span className="sidebar__linkText">Batch</span>
        </label>
        <label className="sidebar__link">
          <i class="fas fa-question-circle"></i>
          <span className="sidebar__linkText">Help</span>
        </label>
        <label className="sidebar__link">
          <i class="fas fa-cog"></i>
          <span className="sidebar__linkText">Settings</span>
        </label>
      </div>

      <Button id="logout" variant="contained">
        <i class="fas fa-sign-out-alt"></i>
        <span>LOGOUT</span>
      </Button>
    </div>
  );
}

export default Sidebar;
