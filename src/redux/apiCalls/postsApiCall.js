import requset from "../../utils/apiRequest";
import {toast} from "react-toastify"
import { postsActions } from "../slices/postsSlice";



// fetch posts 
export function fetchPosts(pageNumber){
    return async(dispatch)=>{
        try {
            dispatch(postsActions.setLoading())
            const {data}= await requset.get(`/post?page=${pageNumber}`);
            dispatch(postsActions.setposts(data.posts));
            dispatch(postsActions.clearLoading())

            
        } catch (error) {
            toast.error(error.response.data.Error)
            dispatch(postsActions.clearLoading())

            console.log(error);
        }
    }
}
// get all posts
export function getAllPosts(){
    return async(dispatch)=>{
        try {
            
            const {data}= await requset.get(`/post`);
            dispatch(postsActions.setposts(data.posts));
  
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// get posts count 
export function getPostsCount(){
    return async(dispatch)=>{
        try {
            const {data}= await requset.get(`/post/count`);
            dispatch(postsActions.setpostsCount(data.postsCount));
            
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}

// fetch posts category 
export function fetchPostsCategory(category){
    return async(dispatch)=>{
        try {
            const {data}= await requset.get(`/post?category=${category}`);
            dispatch(postsActions.setPostsCat(data.posts));

        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// create new post 
export function createPost(newPost){
    return async(dispatch,getState)=>{
        try {
            dispatch(postsActions.setLoading())
            await requset.post(`/post/create-post`,newPost,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                    "Content-Type":"multipart/form-data"
                }
            });
            
            dispatch(postsActions.setIsPostCreated());
            setTimeout(()=>dispatch(postsActions.clearIsPostCreated()),2000);
            
        } catch (error) {
            toast.error(error.response.data.Error);
            dispatch(postsActions.clearLoading());
            console.log(error);
        }
    }
}
// fetch single post 
export function fetchSinglePost(postId){
    return async(dispatch)=>{
        try {
            dispatch(postsActions.setLoading());
            const {data}= await requset.get(`/post/${postId}`);
            dispatch(postsActions.setPost(data.post));
            dispatch(postsActions.clearLoading());

        } catch (error) {
            toast.error(error.response.data.Error)
            dispatch(postsActions.clearLoading());

            console.log(error);
        }
    }
}
// toggle likes 
export function toggleLikePost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await requset.put(`/post/like/${postId}`,{},{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token
                }
            });
            dispatch(postsActions.setLike(data.post));
            
        } catch (error) {
            toast.error(error?.response?.data?.Error);
            console.log(error);
        }
    }
}
// update post image 
export function updatePostImage(newImage,postId){
    return async(dispatch,getState)=>{
        try {
            await requset.put(`/post/update-post-image/${postId}`,newImage,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                    "Content-Type":"multipart/form-data",
                }
            });
            toast.success("post image has been updated successfully ")
            
        } catch (error) {
            toast.error(error?.response?.data?.Error);
            console.log(error);
        }
    }
}
// Update Post 
export function updatePost(newPost,postId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await requset.put(`/post/update-post/${postId}`,newPost,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token
                }
            });
            dispatch(postsActions.setPost(data.updatedPost));
            
        } catch (error) {
            toast.error(error?.response?.data?.Error);
            console.log(error);
        }
    }
}
// delete Post 
export function deletePost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await requset.delete(`/post/${postId}`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token
                }
            });
            dispatch(postsActions.deletePost(postId));
            toast.success(data.message)
            
        } catch (error) {
            toast.error(error?.response?.data?.Error);
            console.log(error);
        }
    }
}