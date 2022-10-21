import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateApplicant, setUpdateApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    stage: "",
    joindate: "",
  });

  useEffect(() => {
    axios
      .get(`https://hrms-api.onrender.com/applicants/${id}`)
      .then((res) => {
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
    const { firstname, lastname, email, stage } = updateApplicant;
    if (firstname && lastname && email && stage) {
      await axios
        .put(`https://hrms-api.onrender.com/applicants/${id}`, updateApplicant)
        .then((res) => alert("Applicant is Updated", res));
      navigate("/applicants");
    } else {
      alert("Fill up all the Required fields");
      navigate("/applicants");
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
              <select
                type="text"
                className="form-control"
                placeholder="Email"
                name="stage"
                onChange={handleChange}
              >
                <option> </option>
                <option>new hire</option>
                <option>onboarding initiated</option>
                <option>onboarding completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Join Date</label>
              <input
                value={updateApplicant.joindate}
                className="form-control"
                placeholder="Join Date"
                name="joindate"
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
      </Container>
    </React.Fragment>
  );
}

export default Update;
