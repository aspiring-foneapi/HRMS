import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmployeeDashboard(props) {
  const APIrenderer = "http://localhost:3001";
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/users/${id}`)
      .then((res) => {
        console.log("First", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`/userdashboard/${id}`}>
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
        <div className="sidebar">
          <div className="page-content-wrapper">
            <div className="position-sticky">
              <div className="list-group list-group-flush mx-3 mt-4">
                <Link
                  to={`/userdashboard/${id}`}
                  className="list-group-item list-group-item-action py-2 ripple"
                  aria-current="true"
                >
                  <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                  <span>Dashboard</span>
                </Link>
                <Link
                  to={`/employeedetails/${id}`}
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-lock fa-fw me-3"></i>
                  <span>Employees</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <main>
          <p>{props.children}</p>
        </main>
      </div>
    </React.Fragment>
  );
}

export default EmployeeDashboard;
