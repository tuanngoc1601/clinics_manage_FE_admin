import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "./redux/store";
import { refreshUserSuccess } from "./redux/authSlice";

export const createAxiosBaseUrl = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        withCredentials: true,
    });
};

const checkIfTokenExpired = (accessToken) => {
    const date = new Date();
    const decodeToken = jwtDecode(accessToken);
    if (decodeToken.exp < date.getTime() / 1000) {
        return true;
    }
    return false;
};

const refreshToken = async () => {
    try {
        const res = await createAxiosBaseUrl().post("/api/v1/auth/refresh");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxiosClient = () => {
    const instance = createAxiosBaseUrl();
    instance.interceptors.request.use(
        async (config) => {
            const user = store.getState().auth.login.currentUser;
            if (user) {
                let accessToken = user.accessToken;
                const isTokenExpired = checkIfTokenExpired(accessToken);
                if (isTokenExpired) {
                    try {
                        const data = await refreshToken();
                        const refreshUser = {
                            ...user,
                            accessToken: data.accessToken,
                        };
                        store.dispatch(refreshUserSuccess(refreshUser));
                        accessToken = refreshUser.accessToken;
                    } catch (error) {
                        console.error("Failed to refresh access token:", error);
                    }
                }
                config.headers["token"] = `Bearer ${accessToken}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};
