import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import EmployeeDetails from "./EmployeeDetails";
import CreateUser from "./CreateUser";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href>
            ASG Platform Talent Center
          </a>
          <form className="d-flex">
            <input className="form-control me-2" placeholder="Search" />
            <button className="btn btn-outline-success me-2">Search</button>
            <button
              className="btn btn-outline-success me-2"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="btn btn-outline-success me-2"
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      <nav id="sidebarMenu" className=" d-lg-block sidebar ">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Main dashboard</span>
            </a>

            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-lock fa-fw me-3"></i>
              <span>Password</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-line fa-fw me-3"></i>
              <span>Analytics</span>
            </a>

            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-bar fa-fw me-3"></i>
              <span>Orders</span>
            </a>
          </div>
        </div>
      </nav>
      <EmployeeDetails />
    </div>
  );
}

export default Home;
