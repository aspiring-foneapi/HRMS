import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Offboarding() {
  const [offboarding, setOffboarding] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/offboarding-employees")
      .then((res) => {
        console.log(res);
        setOffboarding(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleComplete = async (id) => {
    console.log(id.target.id);
    const employeeId = id.target.id;
    await axios
      .delete(`http://localhost:3001/offboarding-employees/${employeeId}`)
      .then(() => alert("Offboarding completed"));
    navigate("/home");
  };
  return (
    <div>
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
      <div className="container">
        <h2 className="text-center">Employees</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Role</th>
            <th>Password</th>
          </thead>
          <tbody>
            {offboarding.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Link
                    className="list-group-item list-group-item-action py-2 ripple"
                    aria-current="true"
                    to={`/employees/${employee.email}`}
                  >
                    {employee.firstname}
                  </Link>
                </td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee._id}</td>
                <td>{employee.role}</td>
                <td>{employee.password}</td>
                <td>
                  <button onClick={handleComplete} id={employee._id}>
                    Offboard Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate("/home")} className="btn btn-primary">
          Home
        </button>
      </div>
    </div>
  );
}

export default Offboarding;
