import axios from "axios";

const api = axios.create({
    baseURL:'http://yourIP:3000'
})
export {api};