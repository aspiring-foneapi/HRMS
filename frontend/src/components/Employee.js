import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Employee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateApplicant, setUpdateApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    timeoff: "",
  });

  useEffect(() => {
    console.log("useeffect part");
    axios
      .get(`http://localhost:3001/users/${id}`)
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
    await axios
      .put(`http://localhost:3001/users/${id}`, updateApplicant)
      .then((res) => alert("Applicant is Updated", res));
    navigate("/employees");
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
      <div className="Register-account p-20vh">
        <form onSubmit={handleChange}>
          <h4>
            Employee, {updateApplicant.firstname} {updateApplicant.lastname}
          </h4>
          <p>{updateApplicant.role}</p>
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
            <label>Password</label>
            <input
              value={updateApplicant.password}
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
              value={updateApplicant.role}
              type="stage"
              className="form-control"
              placeholder="stage"
              name="stage"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Timeoff Remaining</label>
            <input
              value={updateApplicant.timeoff}
              type="timeoff"
              className="form-control"
              placeholder="timeoff"
              name="timeoff"
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/timeoff/${updateApplicant._id}`)}
          >
            Apply Leave/Time Off
          </button>{" "}
          <button onClick={handleSubmit} className="btn btn-primary">
            Update
          </button>{" "}
          <button
            onClick={() => navigate("/employees")}
            className="btn btn-primary"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Employee;
