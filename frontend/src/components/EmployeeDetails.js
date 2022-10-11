import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { Link, useNavigate } from "react-router-dom";

function EmployeeDetails(user) {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        console.log(res);
        setEmployees(res.data.data);
        console.log(res.data.data);
        console.log(res.data.data[0].firstname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Employees</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
        </thead>
        <tbody>
          {employees.map((employee) => (
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
              <td>{employee.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/home")} className="btn btn-primary">
        Home
      </button>
    </div>
  );
}

export default EmployeeDetails;
