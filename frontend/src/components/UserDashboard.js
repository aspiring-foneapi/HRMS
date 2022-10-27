import React, { useEffect, useState } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserDashboard() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${APIrenderer}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    navigate(`/editinformation/${id}`);
  };

  return (
    <React.Fragment>
      <EmployeeDashboard>
        <div>
          <h5>
            <b>Hello, {user.firstname}</b>
          </h5>
          <p>{user.role}</p>
          <button onClick={handleClick} className="btn btn-primary">
            Edit Information
          </button>
        </div>
      </EmployeeDashboard>
    </React.Fragment>
  );
}

export default UserDashboard;
