import React from "react";
import { AppContainer } from "../Containers/Containers";
import Sidebar, { SidebarLink } from "../Sidebar/Sidebar";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminManage from "../AdminManage/AdminManage";
import Notification from "../Notification/Notification";
import { Switch, Route } from "react-router-dom";

function Admin() {
  return (
    <AppContainer>
      <Sidebar>
        <SidebarLink
          to="/dashboard"
          icon={<i className="fas fa-chart-area" />}
          text="Dashboard"
        />
        <SidebarLink
          to="/manage"
          icon={<i className="fas fa-cog" />}
          text="Manage"
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
          <AdminDashboard />
        </Route>
        <Route path="/manage">
          <AdminManage />
        </Route>
        <Route path="/activity">
          <Notification />
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default Admin;
