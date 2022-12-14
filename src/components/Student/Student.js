import React from "react";
import { AppContainer } from "../Containers/Containers";
import Sidebar, { SidebarLink } from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Notification from "../Notification/Notification";
import CommonDashboard from "../FacultyStudentDashboard/FacultyStudentDashboard";

function Student() {
    return (
        <AppContainer>
            <Sidebar>
                <SidebarLink
                    to="/student/dashboard"
                    icon={<i className="fas fa-chart-area" />}
                    text="Dashboard"
                />
                <SidebarLink
                    to="/student/activity"
                    icon={<i class="fas fa-bullhorn" />}
                    text="Activity"
                />
                <SidebarLink
                    to="/student/profile"
                    icon={<i class="fas fa-address-card" />}
                    text="Profile"
                />
            </Sidebar>

            <Routes>
                <Route path="dashboard" element={<CommonDashboard />} />
                <Route path="activity" element={<Notification />} />
                <Route path="profile" element={<h1>Profile</h1>} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>

        </AppContainer>
    );
}

export default Student;
