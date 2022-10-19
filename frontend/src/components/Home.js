import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/home"}>
              ASG Platform Talent Center
            </Link>
            <form className="d-flex">
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
      <main>
        <div className="page-content-wrapper">
          <nav id="sidebarMenu" className=" d-lg-block sidebar ">
            <div className="position-sticky">
              <div className="list-group list-group-flush mx-3 mt-4">
                <Link
                  to={"/home"}
                  className="list-group-item list-group-item-action py-2 ripple"
                  aria-current="true"
                >
                  <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                  <span>Main dashboard</span>
                </Link>

                <Link
                  to={"/employees"}
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-lock fa-fw me-3"></i>
                  <span>Employees</span>
                </Link>
                <Link
                  to={"/applicants"}
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-chart-line fa-fw me-3"></i>
                  <span>Applicants</span>
                </Link>
                <Link
                  to={"/onboarding"}
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-chart-line fa-fw me-3"></i>
                  <span>Onboarding</span>
                </Link>
                <Link
                  to={"/offboarding-employees"}
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-chart-line fa-fw me-3"></i>
                  <span>Offboarding</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default Home;
