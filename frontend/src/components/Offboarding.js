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
  return (
    <div className="container">
      <h2 className="text-center">Employees</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>ID</th>
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
              <td>{employee.password}</td>
              <td>
                <button>Offboard Completed</button>
              </td>
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

export default Offboarding;
