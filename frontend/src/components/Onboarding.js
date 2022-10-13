import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Onboarding() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    stage: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    console.log(value);
    const { firstname, lastname, email, stage } = value;
    if (firstname && lastname && email && stage) {
      await axios
        .post("http://localhost:3001/applicant-registration", value)
        .then((res) => alert(res.data.message));
      navigate("/home");
    } else {
      alert("Fill up all the Required fields");
      navigate("/onboarding");
    }
  };

  return (
    <div className="Register-account">
      <form onSubmit={handleChange}>
        <h4>Register New Applicant</h4>
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
          <label>Stage</label>
          <input
            type="stage"
            className="form-control"
            placeholder="stage"
            name="stage"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Register
        </button>{" "}
        <button onClick={() => navigate("/home")} className="btn btn-primary">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
