import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";

function EmployeeDetails(user) {
  const [employees, setEmployees] = useState([]);

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
    <div>
      <ul>
        {employees.map((employee) => (
          <li>
            <a href="#">{employee.firstname}</a> &nbsp;&nbsp;&nbsp;&nbsp;
            {employee.lastname}&nbsp;&nbsp;&nbsp;&nbsp;
            {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDetails;
