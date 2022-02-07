import axios from "axios";
import { BACKEND_URL } from "./urls";

const API_CLIENT = axios.create({
    baseURL: BACKEND_URL
});

export default API_CLIENT;
