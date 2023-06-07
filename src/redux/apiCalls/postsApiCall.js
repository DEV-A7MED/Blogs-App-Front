import requset from "../../utils/apiRequest";
import {toast} from "react-toastify"
import { postsActions } from "../slices/postsSlice";



// fetch posts 
export function fetchPosts(pageNumber){
    return async(dispatch)=>{
        try {
            const {data}= await requset.get(`/post?page=${pageNumber}`);
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
