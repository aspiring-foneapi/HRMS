import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Register = () => {
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
    const { firstname, lastname, email, password } = value;
    if (firstname && lastname && email && password) {
      await axios
        .post("https://hrms-api.onrender.com/register", value)
        .then((res) => alert(res.data.message));
      navigate("/home");
    } else {
      alert("Fill up all the Required fields");
      navigate("/register");
    }
  };

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/home"}>
              ASG Platform Talent Center
            </Link>
            <form className="d-flex">
              <button
                className="btn btn-outline-success me-2"
                onClick={() => navigate("/")}
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </header>
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
              <input
                type="role"
                className="form-control"
                placeholder="Role"
                name="role"
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
              Register New Employee
            </button>{" "}
            <button
              onClick={() => navigate("/home")}
              className="btn btn-primary"
            >
              Cancel
            </button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};
