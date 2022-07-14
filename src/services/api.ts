import axios from "axios";

console.log(process.env.REACT_APP_API_ENDPOINT_BASEURL)


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT_BASEURL,
    headers: {
        "Content-Type": "application/json",
    }
});


export default instance;