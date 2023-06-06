import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice=createSlice({
    name:"profile",
    initialState:{
        profile:null
        
        
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
        
    }
});
const ProfileReducer=ProfileSlice.reducer;
const profileActions=ProfileSlice.actions;
export{ProfileReducer,profileActions}
