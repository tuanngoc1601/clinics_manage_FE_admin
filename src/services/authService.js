import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const handleLoginService = (data) => {
    return axiosClient.post("/api/v1/auth/admin/login", data);
};

export const handleRegisterService = (user) => {
    return axiosClient.post("/api/v1/auth/admin/sign-up", user);
};

export const handleLogoutService = () => {
    return axiosClientToken.post("/api/v1/auth/logout");
};
