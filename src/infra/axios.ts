import axios from "axios";

const api = axios.create({
    baseURL:'https://100.81.251.122:3000/'
})
export {api};