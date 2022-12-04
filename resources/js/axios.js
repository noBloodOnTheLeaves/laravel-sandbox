import axios from "axios";

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.querySelector(`meta[name="csrf-token"]`).getAttribute("content"),
    'Content-Type':'application/json',
    'Accept':'application/json'
};

const http = axios.create({
    baseURL: "/api/",
    responseType: "json",
});

http.interceptors.response.use(response => {
    return response;
}, error => {
    return error.response;
});

window.axios = http;

export default http;
