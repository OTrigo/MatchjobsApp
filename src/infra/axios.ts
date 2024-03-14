import axios from "axios";

const api = axios.create({
    baseURL:'url:3000/'
})
export {api};