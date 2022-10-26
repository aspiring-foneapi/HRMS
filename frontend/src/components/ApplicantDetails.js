import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Home from "./Home";

function ApplicantDetails() {
  const APIrenderer = "http://localhost:3001";
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [searchStage, setSearchStage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/applicants`)
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
              <h2 className="text-center">Applicants</h2>
              <form className="d-flex">
                <h5>Select stage: </h5>
                <select
                  className="me-2"
                  value={searchStage}
                  onChange={(e) => setSearchStage(e.target.value)}
                >
                  <option> </option>
                  <option>new hire</option>
                  <option>onboarding initiated</option>
                  <option>onboarding completed</option>
                </select>
              </form>
              <table className="table table-bordered table-striped">
                <thead>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Stage</th>
                </thead>
                <tbody>
                  {applicants
                    .sort((a, b) =>
                      a.firstname.toLowerCase() > b.firstname.toLowerCase()
                        ? 1
                        : -1
                    )
                    .filter(
                      (applicant) =>
                        applicant.firstname.includes(search) ||
                        applicant.firstname.toLowerCase().includes(search) ||
                        applicant.firstname.toUpperCase().includes(search)
                    )
                    .filter(
                      (applicant) =>
                        applicant.stage.includes(searchStage) ||
                        applicant.stage.toLowerCase().includes(searchStage) ||
                        applicant.stage.toLowerCase().includes(searchStage)
                    )
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((applicant) => (
                      <tr key={applicant._id}>
                        <td>
                          <Link
                            to={`/applicants/${applicant._id}`}
                            className="list-group-item list-group-item-action py-2 ripple"
                          >
                            {applicant.firstname}
                          </Link>
                        </td>
                        <td>{applicant.lastname}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.stage}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/sendwelcomemail/${applicant._id}`)
                            }
                            id={applicant._id}
                            className="btn btn-success me-2"
                          >
                            Send Invitation mail
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button
                            onClick={() =>
                              navigate(`/applicants/onboard/${applicant._id}`)
                            }
                            className="btn btn-success me-2"
                          >
                            Onboard
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(applicants.length / usersPerPage)}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
              <footer>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-primary"
                >
                  Home
                </button>
              </footer>
            </div>
          </div>
        </Container>
      </Home>
    </React.Fragment>
  );
}

export default ApplicantDetails;
