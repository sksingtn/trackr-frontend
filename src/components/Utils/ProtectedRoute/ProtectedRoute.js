import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

import { selectUserRole, selectUserLoggedInStatus } from "../../Auth/authSlice";
import { USER_MAPPING } from '../../constants'

function ProtectedRoute({ allowedRole }) {

    const loggedIn = useSelector(selectUserLoggedInStatus);
    const role = useSelector(selectUserRole);


    if (loggedIn && role === allowedRole) {
        return <Outlet />
    }
    else if (loggedIn) {
        //Redirect to role specific dashboard if user is authorized
        const redirectTo = USER_MAPPING[role];
        return <Navigate to={redirectTo} />
    }
    else {
        return <Navigate to="/login" />
    }

}

export default ProtectedRoute