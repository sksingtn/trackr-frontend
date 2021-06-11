import React from "react";
import { AppContainer } from "../Containers/Containers";
import Sidebar from "../Sidebar/Sidebar";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminManage from "../AdminManage/AdminManage";
import Notification from "../Notification/Notification";
import { Switch, Route } from "react-router-dom";

function Admin() {
  return (
    <AppContainer>
      <Sidebar />

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
