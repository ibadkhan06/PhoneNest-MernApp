import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
    loginStatus: JSON.parse(localStorage.getItem("loginStatus")) || false, 
    expirationTime: localStorage.getItem("expirationTime") ? parseInt(localStorage.getItem("expirationTime")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
            state.loginStatus = true;
            localStorage.setItem("userData", JSON.stringify(action.payload.userData));
            
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
            state.expirationTime = expirationTime;
            localStorage.setItem("expirationTime", expirationTime);
            localStorage.setItem("loginStatus", JSON.stringify(state.loginStatus)); // Store as JSON string
        },
        logout: (state) => {
            state.userData = null;
            state.loginStatus = false;
            state.expirationTime = null;
            localStorage.removeItem("userData");
            localStorage.removeItem("loginStatus");
            localStorage.removeItem("expirationTime");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
