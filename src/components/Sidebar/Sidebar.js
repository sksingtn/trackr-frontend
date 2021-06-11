import React from "react";
import "./Sidebar.css";

import Button from "@material-ui/core/Button";
import ProfileImage from "../../assets/profileImage.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <i className="fas fa-calendar-week" id="logo"></i>
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
        <Link to="/dashboard" className="sidebar__link">
          <i className="fas fa-chart-area"></i>
          <span className="sidebar__linkText">Dashboard</span>
        </Link>

        <Link to="/manage" className="sidebar__link">
          <i className="fas fa-user-graduate"></i>
          <span className="sidebar__linkText">Batch</span>
        </Link>

        <Link to="/activity" className="sidebar__link">
          <i className="fas fa-question-circle"></i>
          <span className="sidebar__linkText">Help</span>
        </Link>
        <label className="sidebar__link">
          <i className="fas fa-cog"></i>
          <span className="sidebar__linkText">Settings</span>
        </label>
      </div>

      <Button id="logout" variant="contained">
        <i className="fas fa-sign-out-alt"></i>
        <span>LOGOUT</span>
      </Button>
    </div>
  );
}

export default Sidebar;
