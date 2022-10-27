import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Home from "./Home";

function EmployeeDetails(user) {
  const APIrenderer = "https://hrms-api.onrender.com";
  const [employees, setEmployees] = useState([]);
  const [offboarding, setOffboarding] = useState([]);
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

  // const handleDelete = async (id) => {
  //   console.log(id.target.id);
  //   const deleteId = id.target.id;
  //   await axios
  //     .delete(`https://hrms-api.onrender.com/users/${deleteId}`)
  //     .then(navigate("/employees"), () => console.log("Successfully deleted"));
  // };

  const handleOffboard = async (id) => {
    const employeeId = id.target.id;

    await axios.get(`${APIrenderer}/users/${employeeId}`).then((res) => {
      setOffboarding(res.data);

      const firstname = res.data.firstname;
      const lastname = res.data.lastname;
      const email = res.data.email;
      const role = res.data.role;
      const password = res.data.password;
      const id = res.data._id;

      const data = { firstname, lastname, email, role, password };

      axios.post(`${APIrenderer}/offboarding`, data);
      axios.delete(`${APIrenderer}/users/${id}`);
      navigate("/dashboard");
    });
  };

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <React.Fragment>
      <Home>
        <Container>
          <div>
            <form className="d-flex">
              <input
                className="form-control me-2"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
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
                  {employees.length &&
                    employees
                      .sort((a, b) =>
                        a.firstname.toLowerCase() > b.firstname.toLowerCase()
                          ? 1
                          : -1
                      )
                      .filter((employee) =>
                        employee.firstname.toLowerCase().includes(search)
                      )
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((employee) => (
                        <tr key={employee._id}>
                          <td>
                            <Link
                              className="list-group-item list-group-item-action py-2 ripple"
                              aria-current="true"
                              to={`/employees/${employee._id}`}
                            >
                              {employee.firstname}
                            </Link>
                          </td>
                          <td>{employee.lastname}</td>
                          <td>{employee.email}</td>
                          <td>{employee.role}</td>

                          <td>
                            <button
                              onClick={handleOffboard}
                              id={employee._id}
                              className="btn btn-success me-2"
                            >
                              Offboard
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(`/sendinvite/${employee._id}`)
                              }
                              id={employee._id}
                              className="btn btn-success me-2"
                            >
                              Send Invitation mail
                            </button>
                          </td>
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
                onClick={() => navigate("/dashboard")}
                className="btn btn-primary"
              >
                Home
              </button>
            </div>
          </div>
        </Container>
      </Home>
    </React.Fragment>
  );
}

export default EmployeeDetails;
