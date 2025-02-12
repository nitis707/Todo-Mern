import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    },
})

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});