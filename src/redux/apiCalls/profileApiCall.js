import requset from "../../utils/apiRequest";
import {toast} from "react-toastify"
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";


//get user profile
export function getUserProfile(userId){
    return async(dispatch)=>{
        try {
            dispatch(profileActions.setLoading())
            const {data}= await requset.get(`/user/getUserProfile/${userId}`);
            dispatch(profileActions.setProfile(data));
            dispatch(profileActions.clearLoading())
            
        } catch (error) {
            toast.error(error.response.data.Error)
            dispatch(profileActions.clearLoading())

            console.log(error);
        }
    }
}
// update profile photo
export function updateProfilePhoto(profilePhoto){
    return async(dispatch,getState)=>{
        try {
        
            const {data}= await requset.put(`/user/profile/update-profile-photo`,profilePhoto,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                    "Content-Type":"multipart/form-data"
                }
            });
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserPhoto(data.profilePhoto));

            toast.success(data.message);
            // modify localstorage
            const user=JSON.parse(localStorage.getItem("tokenInfo"));
            
            user.profilePhoto=data?.profilePhoto;
            localStorage.setItem("tokenInfo",JSON.stringify(user))
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// update user profile 
export function updateUserProfile(userId,profile){
    return async(dispatch,getState)=>{
        try {
        
            const {data}= await requset.put(`/user/updateProfile/${userId}`,profile,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            
            dispatch(profileActions.setUpdateProfile(data.updatedUser));
            dispatch(authActions.setUserName(data.updatedUser.userName));
            // modify localstorage
            const user=JSON.parse(localStorage.getItem("tokenInfo"));
            
            user.userName=data?.updatedUser.userName;
            localStorage.setItem("tokenInfo",JSON.stringify(user))
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// delete user profile (account)
export function deleteProfile(userId){
    return async(dispatch,getState)=>{
        try {
            dispatch(profileActions.setLoading())
            const {data}= await requset.delete(`/user/profile/${userId}`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(data?.message)
            setTimeout(()=>dispatch(profileActions.clearIsProfileDeleted()),2000)
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
            dispatch(profileActions.clearLoading())
        }
    }
}
// Get users count (only admin )
export function getUsersCount(){
    return async(dispatch,getState)=>{
        try {
            
            const {data}= await requset.get(`/user/getUsersCount`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            
            dispatch(profileActions.setUserCount(data.usersCount
                ));
            
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
            
        }
    }
}
// Get all users profile
export function getAllUsers(){
    return async(dispatch,getState)=>{
        try {
            const {data}= await requset.get(`/user/getUsersProfile`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token,
                }
            });
            
            dispatch(profileActions.setProfiles(data));
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
            
        }
    }
}