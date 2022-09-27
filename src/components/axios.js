import axios from 'axios';

import store from '../app/store';
import { BASE_URL } from './urls';
import { userLoggedOut } from './Auth/authSlice'

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use((config) => {
    const authToken = store.getState().auth.userDetails?.accessToken
    //Inject a auth token
    if (authToken) {
        config.headers.Authorization = `Token ${authToken}`
    }
    return config
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => response, (error) => {
    //If token expires then log out the user
    const statusCode = error.response.status
    const { dispatch } = store
    if (statusCode === 401) {
        dispatch(userLoggedOut())
    }
    return Promise.reject(error);
})


export default axiosInstance