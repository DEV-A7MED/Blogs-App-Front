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