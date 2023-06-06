import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:localStorage.getItem("tokenInfo") ? JSON.parse (localStorage.getItem("tokenInfo")):null,
        registerMessage:null,
        
    },
    reducers:{
        login(state,action){
            state.user=action.payload
        },
        logout(state){
            state.user=null
        },
        register(state,action){
            state.registerMessage=action.payload
        },
        setUserPhoto(state,action){
            state.user.profilePhoto=action.payload
        },
        setUserName(state,action){
            state.user.userName=action.payload
        },
    }
});
const authReducer=authSlice.reducer;
const authActions=authSlice.actions;
export{authReducer,authActions}
