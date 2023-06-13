import { createSlice } from "@reduxjs/toolkit";

const postsSlice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        postsCount:null,
        postsCat:[],
        loading:false,
        isPostCreated:false,
        post:null,
        
        
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
        setPost(state,action){
            state.post=action.payload
        },
        setLike(state,action){
            state.post.likes=action.payload.likes
        },
        deletePost(state,action){
            state.posts=state.posts.filter(p=>p._id !== action.payload)
        },
        setPostComment(state,action){
            state.post.comments.push(action.payload)
        },
        updateComment(state,action){
            state.post.comments=state.post.comments.map(comment=>
                comment._id===action.payload._id ? action.payload: comment
            )
        },
        deleteCommentFromPost(state,action){
            const comment =state.post.comments.find(c=>c._id===action.payload);
            const commentIndex =state.post.comments.indexOf(comment);
            state.post.comments.splice(commentIndex,1);
        },
        

        
    }
});
const postsReducer=postsSlice.reducer;
const postsActions=postsSlice.actions;
export{postsReducer,postsActions}
