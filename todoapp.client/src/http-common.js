import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.log("Error response: ", error.response);
            error.message = error.response.data;
        } else if (error.request) {
            console.log("Error request:", error.request);
            error.message =
                "An error occurred while sending the request. Please check your network connection and try again.";
        } else {
            console.log("Error:", error);
            error.message = "Sorry something went wrong. Try again.";
        }
        return Promise.reject(error);
    }
);

export default api;
