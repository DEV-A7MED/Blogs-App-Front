import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { ProfileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";
import { categoryReducer } from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        profile:ProfileReducer,
        post:postsReducer,
        category:categoryReducer,
        

    }
});

export default store;