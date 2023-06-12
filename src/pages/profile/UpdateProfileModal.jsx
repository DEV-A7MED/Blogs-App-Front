import { useDispatch } from "react-redux";
import "./update-profile-modal.css";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../redux/apiCalls/profileApiCall";
import { useParams } from "react-router-dom";



const UpdateProfileModal = ({ setUpdateProfile,profile }) => {
  const dispatch=useDispatch();
  const [userName, setUsername] = useState(profile.userName);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updatedUser = { userName, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateUserProfile(profile?._id,updatedUser));
    setUpdateProfile(false)
    
  };

  return (
    <div className="update-profile">
      
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
          type="text"
          className="update-profile-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="Bio"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
