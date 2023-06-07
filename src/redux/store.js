import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { ProfileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        profile:ProfileReducer,
        post:postsReducer,

    }
});

export default store;