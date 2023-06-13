import requset from "../../utils/apiRequest";
import { categoryActions } from "../slices/categorySlice";
import {toast} from "react-toastify"
// Fetch All Caategories
export function fetchCategories(){
    return async(dispatch)=>{
        try {
        
            const {data}= await requset.get(`/category`);
            dispatch(categoryActions.setCategories(data.categories));
        
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}
// add category
export function addCategory(newCategory){
    return async(dispatch,getState)=>{
        try {
            dispatch(categoryActions.isLoading())
            const {data}= await requset.post(`/category/create-category`,newCategory,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategory(data.category));
            toast.success(data.message)
            dispatch(categoryActions.clearLoading())
            
        } catch (error) {
            toast.error(error.response.data.Error)
            dispatch(categoryActions.clearLoading())

            console.log(error);
        }
    }
}
// delete category
export function deleteCategory(categoryId){
    return async(dispatch,getState)=>{
        try {
        
            const {data}= await requset.delete(`/category/${categoryId}`,{
                headers:{
                    Authorization:"blogs__" + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategory(data.categoryId));
            toast.success(data.message)
            
        } catch (error) {
            toast.error(error.response.data.Error)
            console.log(error);
        }
    }
}