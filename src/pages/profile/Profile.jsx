import "./profile.css";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useSelector ,useDispatch} from "react-redux";

import { getUserProfile, updateProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams } from "react-router-dom";


const Profile = () => {
  const{profile}=useSelector(state=>state.profile);
  const dispatch =useDispatch()
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const {id}=useParams();
  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [ id ]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file!");
    const formData=new FormData();
    formData.append("image",file);
    dispatch(updateProfilePhoto(formData));

  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) :profile?.profilePhoto.url } alt="" className="profile-image" />
          <form onSubmit={formSubmitHandler}>
          <abbr title="choose profile photo">
            <label
              htmlFor="file"
              className="bi bi-camera-fill upload-profile-photo-icon"
            ></label>
          </abbr>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">upload</button>
          </form>
        </div>
        <h1 className="profile-username">{profile?.userName}</h1>
        <p className="profile-bio">
        {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.userName} Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && 
        <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
