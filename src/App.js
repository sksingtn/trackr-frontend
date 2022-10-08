import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";


import { MainContainer } from "./components/Containers/Containers";
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import AdminSignup from "./components/Signup/AdminSignup";
import FacultySignup from "./components/Signup/FacultySignup";
import StudentSignup from "./components/Signup/StudentSignup";
import Admin from "./components/Admin/Admin";
import Faculty from "./components/Faculty/Faculty";
import Student from "./components/Student/Student";
import ProtectedRoute from "./components/Utils/ProtectedRoute/ProtectedRoute";
import PublicRoutes from "./components/Utils/PublicRoutes/PublicRoutes";
import { ADMIN_ROLE, FACULTY_ROLE, STUDENT_ROLE } from "./components/constants";
import Toast from "./components/Utils/Toast/Toast"



function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<MainContainer>
            <Login />
          </MainContainer>} />
          <Route path="admin-signup" element={<MainContainer>
            <AdminSignup />
          </MainContainer>} />
          <Route path="faculty-signup" element={<MainContainer>
            <FacultySignup />
          </MainContainer>} />
          <Route path="student-signup" element={<MainContainer>
            <StudentSignup />
          </MainContainer>} />
        </Route>

        <Route element={<ProtectedRoute allowedRole={ADMIN_ROLE} />}>
          <Route path="admin/*" element={<MainContainer><Admin />
          </MainContainer>} />
        </Route>

        <Route element={<ProtectedRoute allowedRole={FACULTY_ROLE} />}>
          <Route path="faculty/*" element={<MainContainer><Faculty />
          </MainContainer>} />
        </Route>

        <Route element={<ProtectedRoute allowedRole={STUDENT_ROLE} />}>
          <Route path="student/*" element={<MainContainer><Student />
          </MainContainer>} />
        </Route>
      </Routes>
      <Toast />
    </>



  );
}

export default App;
