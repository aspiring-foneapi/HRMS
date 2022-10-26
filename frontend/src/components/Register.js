import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";

export const Register = () => {
  const APIrenderer = "https://hrms-api.onrender.com";
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    console.log(value);
    const { firstname, lastname, email, password } = value;
    if (firstname && lastname && email && password) {
      await axios
        .post(`${APIrenderer}/register`, value)
        .then((res) => alert(res.data.message));
      navigate("/dashboard");
    } else {
      alert("Fill up all the Required fields");
      navigate("/register");
    }
  };

  return (
    <React.Fragment>
      <Home>
        <Container>
          <div className="Register-account">
            <form onSubmit={handleChange}>
              <h4>Register New Employee</h4>
              <div className="mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastname"
                  onChange={handleChange}
                />
              </div>
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
                <label>Role</label>
                <select
                  type="text"
                  className="form-control"
                  placeholder="Role"
                  name="role"
                  onChange={handleChange}
                >
                  <option>Admin</option>
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                </select>
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
                Register New Employee
              </button>{" "}
              <button
                onClick={() => navigate("/dashboard")}
                className="btn btn-primary"
              >
                Cancel
              </button>
            </form>
          </div>
        </Container>
      </Home>
    </React.Fragment>
  );
};
