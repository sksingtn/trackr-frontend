import React from "react";
import { Routes, Route } from "react-router-dom";

import { AppContainer } from "../Containers/Containers";
import Sidebar, { SidebarLink } from "../Sidebar/Sidebar";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminManage from "../AdminManage/AdminManage";
import Notification from "../Notification/Notification";
import Student from "../AdminManage/Student";
import Faculty from "../AdminManage/Faculty";
import Batch from "../AdminManage/Batch";

function Admin() {
  return (
    <AppContainer>
      <Sidebar>
        <SidebarLink
          to="/admin/dashboard"
          icon={<i className="fas fa-chart-area" />}
          text="Dashboard"
        />
        <SidebarLink
          to="/admin/manage"
          icon={<i className="fas fa-cog" />}
          text="Manage"
        />
        <SidebarLink
          to="/admin/activity"
          icon={<i class="fas fa-bullhorn" />}
          text="Activity"
        />
        <SidebarLink
          to="/admin/profile"
          icon={<i class="fas fa-address-card" />}
          text="Profile"
        />
      </Sidebar>

      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage" element={<AdminManage />}>
          <Route index element={<Student />} />
          <Route path="student" element={<Student />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="batch" element={<Batch />} />
        </Route>
        <Route path="activity" element={<Notification />} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>

    </AppContainer>
  );
}

export default Admin;
