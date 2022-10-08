import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Auth/authSlice";
import adminDashboardReducer from "../components/AdminDashboard/adminDashboardSlice"
import toastReducer from "../components/Utils/Toast/toastSlice";


export default configureStore({
    reducer: {
        auth: authReducer,
        adminDashboard: adminDashboardReducer,
        toast: toastReducer
    }
})