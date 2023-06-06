import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { ProfileReducer } from "./slices/profileSlice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        profile:ProfileReducer
    }
});

export default store;