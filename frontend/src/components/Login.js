import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import data from "../ContextApi";

function Login() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setUserData } = useContext(data);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${APIrenderer}/login`, user).then((res) => {
      alert(res.data.message);
      console.log(res.data.user);
      setUserData(res.data.user);
      if (res.data.user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate(`/userdashboard/${res.data.user._id}`);
      }
    });
  };

  return (
    <div className="login">
      <div className="login-image">
        <img src="/images/applicants.jpg" alt="applicants" />
      </div>
      <div className="login-form">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Welcome to HRMS</h3>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
