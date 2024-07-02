import http from "../http-common";

const login = (data) => http.post("/auth/login", data);

const register = (data) => http.post("/auth/register", data);

const resetPassword = (data) => http.post("/auth/resetPassword", data);

const forgotPassword = (data) => http.post("/auth/forgotPassword", data);

const confirmEmail = (data) => http.post("/auth/confirmEmail", data);

const logOut = () => http.post("/auth/logout");

const changePassword = (data) => http.patch("/auth/changePassword", data);

const authServiceData = {
    login,
    register,
    resetPassword,
    forgotPassword,
    confirmEmail,
    logOut,
    changePassword,
};

export default authServiceData;
