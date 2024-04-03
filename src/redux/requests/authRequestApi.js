import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from "../authSlice";
import { authService } from "../../services";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await authService.handleLoginService(user);
        dispatch(loginSuccess(res.data.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await authService.handleRegisterService(user);
        dispatch(registerSuccess());
        const userLogin = {
            email: user.email,
            password: user.password,
        };
        loginUser(userLogin, dispatch, navigate);
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await authService.handleLogoutService();
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logoutFailed());
    }
};
