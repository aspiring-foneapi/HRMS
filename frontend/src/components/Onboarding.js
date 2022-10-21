import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

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
    const { firstname, lastname, email, stage } = value;
    if (firstname && lastname && email && stage) {
      await axios
        .post("https://hrms-api.onrender.com/applicant-registration", value)
        .then((res) => alert(res.data.message));
      navigate("/home");
    } else {
      alert("Fill up all the Required fields");
      navigate("/onboarding");
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
        <div>
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
              <button onClick={handleSubmit} className="btn btn-primary">
                Add New Applicant
              </button>{" "}
              <button
                onClick={() => navigate("/home")}
                className="btn btn-primary"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Onboarding;
