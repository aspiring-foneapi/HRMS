import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Offboarding() {
  const [offboarding, setOffboarding] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hrms-api.onrender.com/offboarding-employees")
      .then((res) => {
        setOffboarding(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleComplete = async (id) => {
    const employeeId = id.target.id;
    await axios
      .delete(
        `https://hrms-api.onrender.com/offboarding-employees/${employeeId}`
      )
      .then(() => alert("Offboarding completed"));
    navigate("/home");
  };

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/home"}>
            ASG Platform Talent Center
          </Link>
          <form className="d-flex">
            <input
              className="form-control me-2"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
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
        <h2 className="text-center">Offboarding Employees</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Role</th>
            <th>Password</th>
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
                  <td>{employee._id}</td>
                  <td>{employee.role}</td>
                  <td>{employee.password}</td>
                  <td>
                    <button
                      onClick={handleComplete}
                      id={employee._id}
                      className="btn btn-success me-2"
                    >
                      Offboard Completed
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
          onClick={() => navigate("/home")}
          className="btn btn-success me-2"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Offboarding;
