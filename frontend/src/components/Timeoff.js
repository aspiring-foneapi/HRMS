import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

function Timeoff() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateEmployee, setUpdateEmployee] = useState({
    timeoff: "",
    timeoffdate: "",
    leave: "",
  });

  useEffect(() => {
    axios
      .get(`https://hrms-api.onrender.com/users/${id}`)
      .then((res) => {
        setUpdateEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateEmployee((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTimeOffSubmit = async () => {
    await axios
      .put(`https://hrms-api.onrender.com/users/${id}`, updateEmployee)
      .then((res) => alert("Applicant is Updated", res));
    navigate(`/employees/${id}`);
  };

  const handleLeaveSubmit = async () => {
    await axios
      .put(`https://hrms-api.onrender.com/users/${id}`, updateEmployee)
      .then((res) => alert("Applicant is Updated", res));
    navigate(`/employees/${id}`);
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
          <main>
            <form onSubmit={handleChange}>
              <div className="row mb-4">
                <div>
                  <h4>Time Off</h4>
                </div>
                <label className="col-sm-2 col-form-label text-center">
                  From Date <span className="astriccolor">*</span>
                </label>
                <div className="col-sm-5">
                  <input
                    type="date"
                    className="form-control"
                    name="timeofffromdate"
                    placeholder="dd-mm-yyyy"
                    onChange={handleChange}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
              <div className="row mb-4">
                <label className="col-sm-2 col-form-label text-center">
                  to Date <span className="astriccolor">*</span>
                </label>
                <div className="col-sm-5">
                  <input
                    type="date"
                    className="form-control"
                    name="timeofftodate"
                    placeholder="dd-mm-yyyy"
                    onChange={handleChange}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleTimeOffSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>{" "}
              </div>
            </form>
            <form onSubmit={handleChange}>
              <div>
                <h4>Leave</h4>
              </div>
              <div className="row mb-4 text-center">
                <label className="col-sm-2 col-form-label">
                  From Date <span className="astriccolor">*</span>
                </label>

                <div className="col-sm-5 text-center">
                  <input
                    type="date"
                    className="form-control"
                    name="leavefromdate"
                    placeholder="dd-mm-yyyy"
                    onChange={handleChange}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
              <div className="row mb-4 text-center">
                <label className="col-sm-2 col-form-label">
                  to Date <span className="astriccolor">*</span>
                </label>
                <div className="col-sm-5 text-center">
                  <input
                    type="date"
                    className="form-control"
                    name="leavetodate"
                    placeholder="dd-mm-yyyy"
                    onChange={handleChange}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleLeaveSubmit} className="btn btn-primary">
                  Submit
                </button>{" "}
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigate(`/employees/${updateEmployee._id}`)}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Timeoff;
