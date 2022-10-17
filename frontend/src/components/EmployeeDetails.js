import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { Link, useNavigate } from "react-router-dom";

function EmployeeDetails(user) {
  const [employees, setEmployees] = useState([]);
  const [offboarding, setOffboarding] = useState([]);

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

  // const handleDelete = async (id) => {
  //   console.log(id.target.id);
  //   const deleteId = id.target.id;
  //   await axios
  //     .delete(`http://localhost:3001/users/${deleteId}`)
  //     .then(navigate("/employees"), () => console.log("Successfully deleted"));
  // };

  const handleOffboard = async (id) => {
    console.log("Offboarding");
    const employeeId = id.target.id;
    console.log(employeeId);
    await axios.get(`http://localhost:3001/users/${employeeId}`).then((res) => {
      console.log(res.data);
      setOffboarding(res.data);
      console.log(offboarding);
      const firstname = res.data.firstname;
      const lastname = res.data.lastname;
      const email = res.data.email;
      const role = res.data.role;
      const password = res.data.password;
      const id = res.data._id;
      console.log(firstname, lastname, email, role, password);
      const data = { firstname, lastname, email, role, password };
      console.log(id);
      axios.post("http://localhost:3001/offboarding", data);
      axios.delete(`http://localhost:3001/users/${id}`);
      navigate("/home");
    });
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
              <input className="form-control me-2" placeholder="Search..." />
              <button
                className="btn btn-outline-success me-2"
                onClick={() => navigate("/home")}
              >
                Search
              </button>
              <Link to={"/register"}>
                <button className="btn btn-outline-success me-2">
                  Register
                </button>
              </Link>
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
      <div className="container">
        <h2 className="text-center">Employees</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>ID</th>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <Link
                    className="list-group-item list-group-item-action py-2 ripple"
                    aria-current="true"
                    to={`/employees/${employee._id}`}
                  >
                    {employee.firstname}
                  </Link>
                </td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee._id}</td>
                <td>
                  <button onClick={handleOffboard} id={employee._id}>
                    Offboard
                  </button>
                </td>
                <td>
                  <button onClick={""} id={employee._id}>
                    Apply time off
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

export default EmployeeDetails;
