import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Home from "./Home";

function Employee() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateEmployee, setUpdateEmployee] = useState("");

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

  const handleSubmit = async () => {
    await axios
      .put(`${APIrenderer}/users/${id}`, updateEmployee)
      .then((res) => alert("Applicant is Updated", res));
    navigate("/employees");
  };

  const handleDelete = async () => {
    await axios
      .delete(`${APIrenderer}/users/${id}`)
      .then(navigate("/employees"), () => console.log("Successfully deleted"));
  };

  return (
    <React.Fragment>
      <Home>
        <Container>
          <div>
            <div className="Register-account p-20vh">
              <form onSubmit={handleChange}>
                <h4>
                  Employee, {updateEmployee.firstname} {updateEmployee.lastname}
                </h4>
                <p>{updateEmployee.role}</p>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    value={updateEmployee.firstname}
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
                    value={updateEmployee.lastname}
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
                    value={updateEmployee.password}
                    type="password"
                    className="form-control"
                    placeholder="Last name"
                    name="lastname"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    value={updateEmployee.email}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>ID</label>
                  <input
                    value={updateEmployee._id}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Role</label>
                  <select
                    value={updateEmployee.role}
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    name="role"
                    onChange={handleChange}
                  >
                    <option>Admin</option>
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Human Resources</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Date of Joining</label>
                  <p>{updateEmployee.joindate}</p>
                </div>
                <div className="mb-3">
                  <label>Timeoff/Leave Request</label>
                  <table className="table table-bordered table-striped">
                    <thead>
                      <th>Approved/Pending</th>
                      <th>Time Off From</th>
                      <th>Time Off To</th>
                    </thead>
                    <tbody>
                      <td>
                        <input
                          value={updateEmployee.timeoff}
                          type="timeoff"
                          className="form-control"
                          placeholder="No Remaining Time Off"
                          name="timeoff"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          value={updateEmployee.timeofffromdate}
                          type="timeoff"
                          className="form-control"
                          placeholder="No Time Off From date yet"
                          name="timeofffromdate"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          value={updateEmployee.timeofftodate}
                          type="timeoff"
                          className="form-control"
                          placeholder="No Time Off To date yet"
                          name="timeofftodate"
                          onChange={handleChange}
                        />
                      </td>
                    </tbody>
                  </table>
                </div>
                <div className="mb-3">
                  <label>Leave</label>
                  <table className="table table-bordered table-striped">
                    <thead>
                      <th>Leave From</th>
                      <th>Leave to</th>
                    </thead>
                    <tbody>
                      <td>
                        <input
                          value={updateEmployee.leavefromdate}
                          type="leave"
                          className="form-control"
                          placeholder="No leave from date yet"
                          name="leavefromdate"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          value={updateEmployee.leavetodate}
                          type="leave"
                          className="form-control"
                          placeholder="No leave to date yet"
                          name="leavetodate"
                          onChange={handleChange}
                        />
                      </td>
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/timeoff/${updateEmployee._id}`)}
                >
                  Apply Leave/Time Off
                </button>{" "}
                <button onClick={handleSubmit} className="btn btn-primary">
                  Update
                </button>{" "}
                <button onClick={handleDelete} className="btn btn-primary">
                  Delete
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
        </Container>
      </Home>
    </React.Fragment>
  );
}

export default Employee;
