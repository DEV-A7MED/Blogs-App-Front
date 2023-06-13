import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import {  deletePost, getAllPosts } from "../../redux/apiCalls/postsApiCall";

const PostsTable = () => {

  const dispatch=useDispatch();
  const{posts}=useSelector(state=>state.post)

  useEffect(()=>{
    dispatch(getAllPosts())
  },[])
  const navigate=useNavigate()
   // Delete Post Handler
   const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(postId));
        navigate(`/admin-dashboard/posts-table`);

      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.createdBy?.profilePhoto?.url}
                      alt="profilePhoto"
                      className="table-user-image"
                    />
                    <span className="table-username">{item.createdBy?.userName}</span>
                  </div>
                </td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
                    <button onClick={()=>deletePostHandler(item._id)}>Delete Post</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;
