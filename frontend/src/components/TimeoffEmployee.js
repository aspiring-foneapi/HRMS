import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import EmployeeDashboard from "./EmployeeDashboard";

function TimeoffEmployee() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateEmployee, setUpdateEmployee] = useState({
    timeoff: "",
    timeoffdate: "",
    leave: "",
  });

  useEffect(() => {
    axios
      .get(`${APIrenderer}/users/${id}`)
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
      .put(`${APIrenderer}/users/${id}`, updateEmployee)
      .then((res) => alert("Applicant is Updated", res));
    navigate(`/editinformation/${id}`);
  };

  const handleLeaveSubmit = async () => {
    await axios
      .put(`${APIrenderer}/users/${id}`, updateEmployee)
      .then((res) => alert("Applicant is Updated", res));
    navigate(`/editinformation/${id}`);
  };

  return (
    <React.Fragment>
      <EmployeeDashboard>
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
                  onClick={() => navigate(`/editinformation/${id}`)}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
      </EmployeeDashboard>
    </React.Fragment>
  );
}

export default TimeoffEmployee;
