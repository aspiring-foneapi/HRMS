import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Timeoff() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateApplicant, setUpdateApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    console.log("useeffect part");
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        console.log("First", res.data);
        setUpdateApplicant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async () => {
    console.log("Submit button clicked", updateApplicant);
    await axios
      .put(`http://localhost:3001/users/${id}`, updateApplicant)
      .then((res) => alert("Applicant is Updated", res));
    navigate("/employees");
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
    </div>
  );
}

export default Timeoff;
