import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/apiCalls/categoryApiCall";
import {RotatingLines} from 'react-loader-spinner'

const AddCategoryForm = () => {
  const dispatch=useDispatch()
  const{loading}=useSelector(state=>state.category)
  const [title, setTitle] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");
    dispatch(addCategory({title}))
    setTitle("")
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Category Title"
          />
        </div>
        <button type="submit" className="add-category-btn">
          {
            loading? 
              <>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </>
              :
                'Add'
          }
          
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
