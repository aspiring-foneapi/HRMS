import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateApplicant, setUpdateApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    stage: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/applicants/${id}`)
      .then((res) => {
        console.log("First", res.data);
        setUpdateApplicant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateApplicant((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked", updateApplicant);
    const { firstname, lastname, email, stage } = updateApplicant;
    if (firstname && lastname && email && stage) {
      await axios
        .put(`http://localhost:3001/applicants/${id}`, updateApplicant)
        .then((res) => alert("Applicant is Updated", res));
      navigate("/applicants");
    } else {
      alert("Fill up all the Required fields");
      navigate("/applicants");
    }
  };

  return (
    <div className="Register-account">
      <form onSubmit={handleChange}>
        <h4>Register New Applicant</h4>
        <div className="mb-3">
          <label>First Name</label>
          <input
            value={updateApplicant.firstname}
            type="text"
            placeholder="First name"
            className="form-control"
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            value={updateApplicant.lastname}
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
            value={updateApplicant.email}
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
            value={updateApplicant.stage}
            type="stage"
            className="form-control"
            placeholder="stage"
            name="stage"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Update
        </button>{" "}
        <button
          onClick={() => navigate("/applicants")}
          className="btn btn-primary"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Update;
