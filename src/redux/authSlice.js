import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        currentUser: null,
        pendding: false,
        error: false,
    },
    register: {
        pendding: false,
        error: false,
        success: false,
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.pendding = true;
        },
        loginSuccess: (state, action) => {
            state.login.pendding = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.pendding = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.pendding = true;
        },
        registerSuccess: (state) => {
            state.register.pendding = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.pendding = false;
            state.register.error = true;
            state.register.success = false;
        },
        logoutStart: (state) => {
            state.login.pendding = true;
        },
        logoutSuccess: (state) => {
            state.login.pendding = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.pendding = false;
            state.login.error = true;
        },
        refreshUserSuccess: (state, action) => {
            state.login.currentUser = action.payload;
        },
        resetAuthStateRedux: () => initialState,
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    refreshUserSuccess,
    resetAuthStateRedux,
} = authSlice.actions;

export default authSlice.reducer;