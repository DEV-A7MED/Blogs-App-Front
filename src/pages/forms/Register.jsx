import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert"
const Register = () => {
  const dispatch = useDispatch();
  const{registerMessage}=useSelector(state=>state.auth)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setConfirmPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (userName.trim() === "") return toast.error("username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (cpass.trim() === "") return toast.error("confirmPassword is required");
    if(password!==cpass) return toast.error("password not matched");
    dispatch(registerUser({userName, email, password,cpass}))
    // console.log({ username, email, password });
  };
const navigate=useNavigate();
if(registerMessage){
  swal({
    title:registerMessage,
    icon:"success",
  }).then(isOk=>{
    if(isOk){
      navigate("/login")
    }
  })
}
  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
          confirmPassword
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={cpass}
            type="password"
            id="confirmPassword"
            placeholder="Enter your confirmPassword"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
