import axios from "axios";

const api = axios.create({
    baseURL:'http://YOUR_IP:3000'
})
export {api};