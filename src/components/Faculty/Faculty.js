import React from "react";
import { AppContainer } from "../Containers/Containers";
import Sidebar, { SidebarLink } from "../Sidebar/Sidebar";
import { Switch, Route } from "react-router-dom";
import Notification from "../Notification/Notification";
import FacultyDashboard from "../FacultyDashboard/FacultyDashboard";

function Faculty() {
  return (
    <AppContainer>
      <Sidebar>
        <SidebarLink
          to="/dashboard"
          icon={<i className="fas fa-chart-area" />}
          text="Dashboard"
        />
        <SidebarLink
          to="/activity"
          icon={<i class="fas fa-bullhorn" />}
          text="Activity"
        />
        <SidebarLink
          to="/profile"
          icon={<i class="fas fa-address-card" />}
          text="Profile"
        />
      </Sidebar>

      <Switch>
        <Route exact path="/dashboard">
          <FacultyDashboard />
        </Route>
        <Route path="/activity">
          <Notification />
        </Route>

        <Route path="/profile">
          <h1>Profile</h1>
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default Faculty;
