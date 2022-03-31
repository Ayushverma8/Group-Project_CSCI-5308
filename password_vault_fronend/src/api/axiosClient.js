import axios from "axios";
import { BACKEND_URL } from "./urls";
import { AUTH_TOKEN_KEY } from '../utils/authHelpers'
import { useNavigate } from "react-router-dom";

const API_CLIENT = axios.create({
    baseURL: BACKEND_URL
});

API_CLIENT.interceptors.request.use(function (config) {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        config.headers.Authorization = 'Token ' + localStorage.getItem(AUTH_TOKEN_KEY);
    }

    return config;
});

API_CLIENT.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if (err.response.status == 403) {
        window.location.href = '/validate_mpin'
        return Promise.reject(err);
    } else if (err.response.status == 401) {
        window.location.href = '/verify_email_message'
        return Promise.reject(err);
    }

    return Promise.reject(err);
});

export default API_CLIENT;
