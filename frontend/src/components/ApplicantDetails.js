import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="container">
      <h2 className="text-center">Applicants</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Stage</th>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.firstname}</td>
              <td>{applicant.lastname}</td>
              <td>{applicant.email}</td>
              <td>{applicant.stage}</td>
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

export default ApplicantDetails;
