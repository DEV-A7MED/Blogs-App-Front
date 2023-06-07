import { createSlice } from "@reduxjs/toolkit";

const postsSlice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        postsCount:null,
        postsCat:[],
        loading:false,
        isPostCreated:false,
        
        
    },
    reducers:{
        setposts(state,action){
            state.posts=action.payload
        },
        setpostsCount(state,action){
            state.postsCount=action.payload
        },
        setPostsCat(state,action){
            state.postsCat=action.payload
        },
        setLoading(state){
            state.loading= true
        },
        clearLoading(state){
            state.loading= false
        },
        setIsPostCreated(state){
            state.isPostCreated= true
            state.loading= false

        },
        clearIsPostCreated(state){
            state.isPostCreated= false

        },

        
    }
});
const postsReducer=postsSlice.reducer;
const postsActions=postsSlice.actions;
export{postsReducer,postsActions}
