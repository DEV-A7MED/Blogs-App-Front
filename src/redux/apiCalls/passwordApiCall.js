import { toast } from "react-toastify";
import requset from "../../utils/apiRequest";
import { passwordActions } from "../slices/passwordSlice";



// forgot password
export function forgotPassword(email){
    return async()=>{
        try {
            const {data}=await requset.post(`/auth/reset-password`,{email});
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// Get reset password
export function getResetPassword(userId,token){
    return async(dispatch)=>{
        try {
            await requset.get(`/auth/reset-password/${userId}/${token}`);
        } catch (error) {
            console.log(error);
            dispatch(passwordActions.setIsError());
        }
    }
}
// Reset password
export function resetPassword(newPassword,user){
    return async()=>{
        try {
        const {data} =  await requset.put(`/auth/reset-password/${user.userId}/${user.token}`,{
            password:newPassword
        }
        );
            toast.success(data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.Error)

        }
    }
}