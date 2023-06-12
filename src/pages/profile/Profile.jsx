import "./profile.css";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfile, getUserProfile, updateProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";


const Profile = () => {
  const { profile, loading,isProfileDeleted } = useSelector(state => state.profile);
  const{user}=useSelector(state=>state.auth);
  const dispatch = useDispatch()
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [dispatch,id]);

  const navigate=useNavigate();
  useEffect(()=>{
    if(isProfileDeleted){
      navigate('/')
    }
  },[navigate,isProfileDeleted])
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
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
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  }

  return (
    <>
      {
        loading ?
          <>
            <div className="loading-screen-container">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName="loading-screen"
                visible={true}
              />
            </div>
          </>
          :
          <>
            <section className="profile">
              <div className="profile-header">
                <div className="profile-image-wrapper">
                  <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="" className="profile-image" />
                  {
                    user?._id===profile?._id && (
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
                    )
                  }
                </div>
                <h1 className="profile-username">{profile?.userName}</h1>
                <p className="profile-bio">
                  {profile?.bio}
                </p>
                <div className="user-date-joined">
                  <strong>Date Joined: </strong>
                  <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {
                  user?._id===profile?._id &&(
                    <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                  <i className="bi bi-file-person-fill"></i>
                  Update Profile
                </button>
                  )
                }
                
              </div>
              <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.userName} Posts</h2>
                {
                  profile?.posts?.map(post =>
                    <PostItem
                      key={post?._id}
                      post={post}
                      userName={profile?.userName}
                      userId={profile?._id}
                    />
                  )
                }
                {/* <PostList posts={profile?.posts} /> */}
              </div>
              {
                  user?._id===profile?._id &&(
                    <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete Your Account
              </button>
                  )
                }
              
              {updateProfile &&
                <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
            </section>
          </>
      }
    </>

  );
};

export default Profile;
