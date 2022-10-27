import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

function SendInvitation() {
  const APIrenderer = "https://hrms-api.onrender.com";
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const form = useRef();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/users/${id}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_kvf0h4s", form.current, "6lu_IchJufA6FUWCR")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    navigate("/employees");
  };
  return (
    <React.Fragment>
      <Home>
        <div>
          <div className="container">
            <form onSubmit={sendEmail} ref={form}>
              <div className="row pt-5 mx-auto">
                <div className="col-8 form-group mx-auto">
                  <input
                    value={employee.firstname}
                    type="text"
                    className="form-control"
                    placeholder="Firstname"
                    name="name"
                    required
                    onChange={(e) => setEmployee(e.target.value)}
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    value={employee.lastname}
                    type="text"
                    className="form-control"
                    placeholder="Lastname"
                    name="lastname"
                    required
                    onChange={(e) => setEmployee(e.target.value)}
                  />
                </div>
                <div className="col-8 form-group pt-2 mx-auto">
                  <input
                    value={employee.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={(e) => setEmployee(e.target.value)}
                  />
                </div>
                <div className="col-8 form-group pt-2 mx-auto">
                  <input
                    value={employee._id}
                    type="id"
                    className="form-control"
                    placeholder="ID"
                    name="id"
                    required
                    onChange={(e) => setEmployee(e.target.value)}
                  />
                </div>
                <div className="col-8 form-group pt-2 mx-auto">
                  <input
                    value={"ASG Platform Talent"}
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    required
                  />
                </div>
                <div className="col-8 form-group pt-2 mx-auto">
                  <textarea
                    id=""
                    cols="30"
                    rows="8"
                    className="form-control"
                    placeholder="Your message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="col-8 pt-3 mx-auto">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Send Message"
                  />
                </div>
                <div
                  className="col-8 pt-3 mx-auto"
                  onClick={() => navigate("/employees")}
                >
                  <button className="btn btn-info">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Home>
    </React.Fragment>
  );
}

export default SendInvitation;
