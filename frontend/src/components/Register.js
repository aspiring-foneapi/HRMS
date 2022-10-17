import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log(value);
    const { firstname, lastname, email, password } = value;
    if (firstname && lastname && email && password) {
      await axios
        .post("http://localhost:3001/register", value)
        .then((res) => alert(res.data.message));
      navigate("/home");
    } else {
      alert("Fill up all the Required fields");
      navigate("/register");
    }
  };

  return (
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
        <button onClick={() => navigate("/home")} className="btn btn-primary">
          Cancel
        </button>
      </form>
    </div>
  );
};
