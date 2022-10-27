import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import EmployeeDashboard from "./EmployeeDashboard";

function EmployeeDetailsDashboard() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const { id } = useParams();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/users`)
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <React.Fragment>
      <EmployeeDashboard>
        <Container>
          <div>
            <div>
              <h2 className="text-center">Employees</h2>
              <table className="table table-bordered table-striped">
                <thead>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </thead>
                <tbody>
                  {employees
                    .sort((a, b) =>
                      a.firstname.toLowerCase() > b.firstname.toLowerCase()
                        ? 1
                        : -1
                    )
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.firstname}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.email}</td>
                        <td>{employee.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(employees.length / usersPerPage)}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
              <button
                onClick={() => navigate(`/userdashboard/${id}`)}
                className="btn btn-primary"
              >
                Home
              </button>
            </div>
          </div>
        </Container>
      </EmployeeDashboard>
    </React.Fragment>
  );
}

export default EmployeeDetailsDashboard;
