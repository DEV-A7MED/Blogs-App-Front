import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice=createSlice({
    name:"profile",
    initialState:{
        profile:null,
        loading:false,
        
    },
    reducers:{
        setProfile(state,action){
            state.profile=action.payload
        },
        setProfilePhoto(state,action){
            state.profile.profilePhoto=action.payload
        },
        setUpdateProfile(state,action){
            state.profile=action.payload
        },
        setLoading(state){
            state.loading= true
        },
        
        clearLoading(state){
            state.loading= false
        },
        
    }
});
const ProfileReducer=ProfileSlice.reducer;
const profileActions=ProfileSlice.actions;
export{ProfileReducer,profileActions}
