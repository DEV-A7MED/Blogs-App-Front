import requset from "../../utils/apiRequest";
import { authActions } from "../slices/authSlice";
import {toast} from "react-toastify"
// logIn user
export function loginUser(user){
    return async(dispatch)=>{
        try {
        
            const {data}= await requset.post(`/auth/logIn`,user);
            dispatch(authActions.login(data));
            localStorage.setItem("tokenInfo",JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// logOut user
export function logoutUser(){
    return async(dispatch)=>{
        
            dispatch(authActions.logout());
            localStorage.removeItem("tokenInfo");
            
    }
}
// register user
export function registerUser(user){
    return async(dispatch)=>{
        try {
        
            const {data}= await requset.post(`/auth/signUp`,user);
            dispatch(authActions.register(data.message));
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
