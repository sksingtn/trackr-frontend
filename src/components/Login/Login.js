import React, { useState, useEffect } from 'react'
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

& > input,button,select{
    font-size: 2em;
}
`

function Login() {
    const userRole = useSelector(state => state.auth.userDetails?.role)
    const isLoggedIn = useSelector(state => state.auth.userLoggedIn)
    const loadingStatus = useSelector(state => state.auth.loading)
    const errorMessage = useSelector(state => state.auth.errorMessage)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //TODO:Temporary for faster login
    const [autofill, setAutofill] = useState("1");
    const dispatch = useDispatch();

    const canSave = Boolean(email) && Boolean(password)
    const errorStyle = {
        color: 'red', fontWeight: 800, fontSize: '20px'
        , background: 'white'
    }

    useEffect(() => {
        switch (autofill) {
            case "1":
                setEmail("admin1@trackr.com")
                setPassword("admin@trackr")
                break
            case "2":
                setEmail("admin1_faculty5@trackr.com")
                setPassword("faculty@trackr")
                break
            case "3":
                setEmail("admin1_student1@trackr.com")
                setPassword("student@trackr")
                break

        }

    }, [autofill])


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


    }

    return (
        <div>
            <Form onSubmit={handleSave}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span style={errorStyle} hidden={!errorMessage}>{errorMessage}</span>
                <select value={autofill} onChange={(e) => setAutofill(e.target.value)}>
                    <option value="1">ADMIN</option>
                    <option value="2">FACULTY</option>
                    <option value="3">STUDENT</option>
                </select>
                <button type="submit" disabled={loadingStatus || !canSave}>{loadingStatus ? 'Loading...' : 'LOGIN'}</button>
            </Form>
        </div >
    )
}

export default Login