import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const handleLoginService = (user) => {
    return axiosClient.post("/api/v1/auth/login", user);
};

export const handleRegisterService = (user) => {
    return axiosClient.post("/api/v1/auth/sign-up", user);
};

export const handleLogoutService = () => {
    return axiosClientToken.post("/api/v1/auth/logout");
};
