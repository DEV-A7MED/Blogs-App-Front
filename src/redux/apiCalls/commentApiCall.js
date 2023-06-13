import requset from "../../utils/apiRequest";
import {toast} from "react-toastify"
import { postsActions } from "../slices/postsSlice";
import { commentActions } from "../slices/commentSlice";

// create new comment
export function addComment(comment){
    return async(dispatch,getState)=>{
        try {
            dispatch(postsActions.setLoading())
            const {data}= await requset.post(`/comment/create-comment`,comment,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            dispatch(postsActions.setPostComment(data.comment));
            dispatch(postsActions.clearLoading())
            
        } catch (error) {
            toast.error(error.response.data.Error)
            dispatch(postsActions.clearLoading())

            console.log(error);
        }
    }
}
// update comment
export function updateComment(commentId,comment){
    return async(dispatch,getState)=>{
        try {
            
            const {data}= await requset.put(`/comment/update-comment/${commentId}`,comment,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            dispatch(postsActions.updateComment(data.updatedComment));
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// delete comment from post
export function deleteComment(commentId){
    return async(dispatch,getState)=>{
        try {
            
            await requset.delete(`/comment/${commentId}`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            dispatch(commentActions.deleteComment(commentId))
            dispatch(postsActions.deleteCommentFromPost(commentId));
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// fetch all comments
export function fetchAllComments(){
    return async(dispatch,getState)=>{
        try {
            
            const{data} =await requset.get(`/comment`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            dispatch(commentActions.setComments(data.comments))
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
