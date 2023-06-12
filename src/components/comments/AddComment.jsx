import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./add-comment.css";
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from "../../redux/apiCalls/commentApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchSinglePost } from "../../redux/apiCalls/postsApiCall";

const AddComment = ({postId}) => {
  const dispatch=useDispatch();
  const{loading}=useSelector(state=>state.post)

 const [text, setText] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(text.trim() === "") return toast.error("Please write something")
    dispatch(addComment({text,postId}))
    setText("");
    
  }

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
      {
            loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            )
              
              :
                'Comment'}
      </button>
    </form>
  );
};

export default AddComment;
