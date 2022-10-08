import { createSlice } from "@reduxjs/toolkit";

import { ADMIN_ROLE, FACULTY_ROLE, STUDENT_ROLE } from "../constants";
import { setToastSuccess } from "../Utils/Toast/toastSlice";
import axiosInstance from '../axios';
import { COMMON_LOGIN } from '../urls';


const initialState = {
    userLoggedIn: false,
    userDetails: {
        role: null,
        accessToken: null
    },
    errorMessage: null,
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.userLoggedIn = true;
            state.userDetails = action.payload;
            state.errorMessage = null;
        },
        logOut: state => {
            state = initialState
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.errorMessage = action.payload
            state.loading = false
        },
        userLoggedIn: (state, action) => {
            const { token: accessToken, role } = action.payload;
            state.userLoggedIn = true
            state.userDetails = { role, accessToken }
            state.errorMessage = ''
            state.loading = false

        },
        userLoggedOut: state => {
            return initialState
        }

    }
})


export const logInUser = (payload) => {
    return async (dispatch, getState) => {
        dispatch(setLoading())
        try {
            const response = await axiosInstance.post(COMMON_LOGIN, payload)
            const { token, role } = response.data.data;
            const VALID_ROLES = [ADMIN_ROLE, FACULTY_ROLE, STUDENT_ROLE]
            if ((token && token.length > 0) && VALID_ROLES.includes(role)) {
                dispatch(userLoggedIn(response.data.data))
                dispatch(setToastSuccess("User Logged in Successfully!"))
            }
            else {
                dispatch(setError("Something went wrong!"))
            }
        }
        catch (err) {
            dispatch(setError(err.response.data.data))
        }

    }
}

export default authSlice.reducer;

export const selectUserRole = state => state.auth.userDetails?.role;
export const selectUserLoggedInStatus = state => state.auth.userLoggedIn;

export const { logIn, logOut, setLoading, setError, userLoggedIn, userLoggedOut } = authSlice.actions;