import axios from "axios";
import { BACKEND_URL } from "./urls";
import { AUTH_TOKEN_KEY } from '../utils/authHelpers'

const API_CLIENT = axios.create({
    baseURL: BACKEND_URL
});

API_CLIENT.interceptors.request.use(function (config) {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        config.headers.Authorization = 'Token ' + localStorage.getItem(AUTH_TOKEN_KEY);
    }

    return config;
})

export default API_CLIENT;
