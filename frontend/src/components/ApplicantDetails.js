import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ApplicantDetails() {
  const [applicants, setApplicants] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/applicants")
      .then((res) => {
        console.log(res);
        setApplicants(res.data.data);
        console.log(res.data.data);
        console.log(res.data.data[0].firstname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
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
        <h2 className="text-center">Applicants</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Stage</th>
            <th>ID</th>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant._id}>
                <td>{applicant.firstname}</td>
                <td>{applicant.lastname}</td>
                <td>{applicant.email}</td>
                <td>{applicant.stage}</td>
                <td>{applicant._id}</td>
                <td>
                  <button
                    onClick={() => navigate(`/applicants/${applicant._id}`)}
                  >
                    Update
                  </button>{" "}
                  <button
                    onClick={() =>
                      navigate(`/applicants/onboard/${applicant._id}`)
                    }
                  >
                    Onboard
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <button onClick={() => navigate("/home")} className="btn btn-primary">
            Home
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ApplicantDetails;
