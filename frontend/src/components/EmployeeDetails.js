import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

function EmployeeDetails(user) {
  const [employees, setEmployees] = useState([]);
  const [offboarding, setOffboarding] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hrms-api.onrender.com/users")
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleDelete = async (id) => {
  //   const deleteId = id.target.id;
  //   await axios
  //     .delete(`http://localhost:3001/users/${deleteId}`)
  //     .then(navigate("/employees"), () => console.log("Successfully deleted"));
  // };

  const handleOffboard = async (id) => {
    const employeeId = id.target.id;
    await axios
      .get(`https://hrms-api.onrender.com/users/${employeeId}`)
      .then((res) => {
        setOffboarding(res.data);
        const firstname = res.data.firstname;
        const lastname = res.data.lastname;
        const email = res.data.email;
        const role = res.data.role;
        const password = res.data.password;
        const id = res.data._id;
        const data = { firstname, lastname, email, role, password };
        axios.post("https://hrms-api.onrender.com/offboarding", data);
        axios.delete(`https://hrms-api.onrender.com/users/${id}`);
        navigate("/home");
      });
  };

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <React.Fragment>
      <header>
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
      <Container>
        <div>
          <div className="container">
            <h2 className="text-center">Employees</h2>
            <form className="d-flex">
              <h5>sort by: </h5>
              <select
                className="me-2"
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
              >
                <option> </option>
                <option>admin</option>
                <option>employee</option>
              </select>
            </form>
            <table className="table table-bordered table-striped">
              <thead>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>ID</th>
              </thead>
              <tbody>
                {employees
                  .sort((a, b) =>
                    a.firstname.toLowerCase() > b.firstname.toLowerCase()
                      ? 1
                      : -1
                  )
                  .filter(
                    (employee) =>
                      employee.firstname.includes(search) ||
                      employee.firstname.toLowerCase().includes(search) ||
                      employee.firstname.toUpperCase().includes(search)
                  )
                  .filter(
                    (employee) =>
                      employee.role.includes(searchRole) ||
                      employee.role.toLowerCase().includes(searchRole) ||
                      employee.role.toUpperCase().includes(searchRole)
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
                      <td>{employee._id}</td>
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
              onClick={() => navigate("/home")}
              className="btn btn-primary"
            >
              Home
            </button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default EmployeeDetails;
