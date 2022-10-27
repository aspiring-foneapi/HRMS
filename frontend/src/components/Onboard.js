import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Home from "./Home";

function Onboard() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateApplicant, setUpdateApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`${APIrenderer}/applicants/${id}`)
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
    const { firstname, lastname, email, password } = updateApplicant;
    if (firstname && lastname && email && password) {
      await axios
        .post(`${APIrenderer}/register`, updateApplicant)
        .then((res) => alert(res.data.message))
        .then(axios.delete(`${APIrenderer}/applicants/${updateApplicant._id}`));
      console.log("successfully deleted");
      navigate("/dashboard");
    } else {
      alert("Fill up all the Required fields");
      navigate(`/applicants/onboard/${id}`);
    }
  };

  return (
    <React.Fragment>
      <Home>
        <Container>
          <div>
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
                  Onboard
                </button>{" "}
                <button
                  onClick={() => navigate("/applicants")}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Home>
    </React.Fragment>
  );
}

export default Onboard;
