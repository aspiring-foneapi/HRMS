import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

function SetupEmployee() {
  const APIrenderer = "http://localhost:3001";
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateEmployee, setUpdateEmployee] = useState("");

  useEffect(() => {
    console.log("useeffect part");
    axios
      .get(`${APIrenderer}/users/${id}`)
      .then((res) => {
        console.log("First", res.data);
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
    console.log("Submit button clicked", updateEmployee);
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
      <Container>
        <div>
          <header>
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <Link className="navbar-brand" to={""}>
                  ASG Platform Talent Center
                </Link>

                <button
                  className="btn btn-outline-success me-2"
                  onClick={() => navigate("/")}
                >
                  Logout
                </button>
              </div>
            </nav>
          </header>
          <main>
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
                  <label>Date of Joining</label>
                  <p>{updateEmployee.joindate}</p>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>{" "}
                <button
                  onClick={() => navigate("/employees")}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </form>
            </div>
          </main>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default SetupEmployee;
