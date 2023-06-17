import {  configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { ProfileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";
import { passwordReducer } from "./slices/passwordSlice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        profile:ProfileReducer,
        post:postsReducer,
        category:categoryReducer,
        comment:commentReducer,
        password:passwordReducer
        

    }
});

export default store;