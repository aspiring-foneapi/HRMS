import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function Onboard() {
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
    console.log(updateApplicant);
    const { firstname, lastname, email, password } = updateApplicant;
    if (firstname && lastname && email && password) {
      await axios
        .post("http://localhost:3001/register", updateApplicant)
        .then((res) => alert(res.data.message))
        .then(
          axios
            .delete(`http://localhost:3001/applicants/${updateApplicant._id}`)
            .then(() => console.log("Successfully deleted"))
        );
      console.log("successfully deleted");
      navigate("/home");
    } else {
      alert("Fill up all the Required fields");
      navigate(`/applicants/onboard/${id}`);
    }
  };

  return (
    <div>
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
  );
}

export default Onboard;
