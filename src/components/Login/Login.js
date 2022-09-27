import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { logInUser } from '../Auth/authSlice';
import { setToastSuccess, setToastError } from '../Utils/Toast/toastSlice';
import { USER_MAPPING } from '../constants';

const Form = styled.form`
display:flex;
flex-direction: column;
gap: 1em;

& > input,button{
    font-size: 2em;
}
`

function Login() {
    const userRole = useSelector(state => state.auth.userDetails?.role)
    const isLoggedIn = useSelector(state => state.auth.userLoggedIn)
    const loadingStatus = useSelector(state => state.auth.loading)
    const errorMessage = useSelector(state => state.auth.errorMessage)

    const [email, setEmail] = useState('admin1@trackr.com')
    const [password, setPassword] = useState('admin@trackr')
    const dispatch = useDispatch();

    const canSave = Boolean(email) && Boolean(password)
    const errorStyle = {
        color: 'red', fontWeight: 800, fontSize: '20px'
        , background: 'white'
    }

    if (isLoggedIn) {
        const redirectTo = USER_MAPPING[userRole];
        return <Navigate to={redirectTo} />
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const payload = {
            'email': email,
            'password': password
        }

        dispatch(logInUser(payload))
        dispatch(setToastSuccess("User Logged in Successfully!"))

    }

    return (
        <div>
            <Form onSubmit={handleSave}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span style={errorStyle} hidden={!errorMessage}>{errorMessage}</span>
                <button type="submit" disabled={loadingStatus || !canSave}>{loadingStatus ? 'Loading...' : 'LOGIN'}</button>
            </Form>
        </div >
    )
}

export default Login