import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Home from "./Home";

function Offboarding() {
  const { id } = useParams();
  const APIrenderer = "https://hrms-api.onrender.com";
  const [offboarding, setOffboarding] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/offboarding-employees`)
      .then((res) => {
        console.log(res);
        setOffboarding(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleComplete = async (id) => {
    console.log(id.target.id);
    const employeeId = id.target.id;
    await axios
      .delete(`${APIrenderer}/offboarding-employees/${employeeId}`)
      .then(() => alert("Offboarding completed"));
    navigate("/dashboard");
  };

  const handleUndo = async (id) => {
    const employeeId = id.target.id;
    console.log(employeeId);
    await axios
      .get(`${APIrenderer}/offboarding-employees/${employeeId}`)
      .then((res) => {
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
        axios.post(`${APIrenderer}/register`, data);
        axios.delete(`${APIrenderer}/offboarding-employees/${id}`);
        navigate("/dashboard");
      });
  };

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Home>
      <div>
        <div>
          <h2 className="text-center">Offboarding Employees</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </thead>
            <tbody>
              {offboarding
                .sort((a, b) =>
                  a.firstname.toLowerCase() > b.firstname.toLowerCase() ? 1 : -1
                )
                .filter(
                  (employee) =>
                    employee.firstname.toLowerCase().includes(search) ||
                    employee.firstname.toUpperCase().includes(search) ||
                    employee.firstname.includes(search)
                )
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>
                      <button
                        onClick={handleComplete}
                        id={employee._id}
                        className="btn btn-success me-2"
                      >
                        Offboard Completed
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={handleUndo}
                        id={employee._id}
                        className="btn btn-success me-2"
                      >
                        Back to Onboard
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(offboarding.length / usersPerPage)}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-success me-2"
          >
            Home
          </button>
        </div>
      </div>
    </Home>
  );
}

export default Offboarding;
