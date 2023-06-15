import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const dispatch=useDispatch()
  const{user}=useSelector(state=>state.auth);
  const[dropDown,setDropDown]=useState(false)

  
  // logout handler
  const logoutHandler=()=>{
    setDropDown(false)
    dispatch(logoutUser())
  }
  

  return (
    <div className="header-right">
      {user?
      <>
        <div className="header-right-user-info">
          <span onClick={()=>setDropDown(prev => !prev)} className="header-right-username">{user.userName}</span>
          <img src={user?.profilePhoto?.url} alt="user phto" className="header-right-user-photo"/>
          {dropDown &&(
            <div className="header-right-dropdown">
            <Link to={`/profile/${user._id}`} className="header-dropdown-item" onClick={()=>setDropDown(false)}>
              <i className="bi bi-file-person"></i>
              <span >Profile</span>
            </Link>
            <div onClick={logoutHandler} className="header-dropdown-item">
            <i className="bi bi-box-arrow-in-left"></i>
              <span >logout</span>
            </div>
          </div>
          )}
        </div>
      </>
      :
      <>
      <Link className="header-right-link" to="/login">
        <i className="bi bi-box-arrow-in-right"></i>
        <span>Login</span>
      </Link>
      <Link className="header-right-link" to="/register">
        <i className="bi bi-person-plus"></i>
        <span>Register</span>
      </Link>
      </>
      }
    </div>
  );
};

export default HeaderRight;
