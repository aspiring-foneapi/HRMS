import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

function SendWelcomeMail() {
  const APIrenderer = "http://localhost:3001";
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState([]);
  const { id } = useParams();
  const form = useRef();

  useEffect(() => {
    axios
      .get(`${APIrenderer}/applicants/${id}`)
      .then((res) => {
        setApplicant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_2vnrqsm", form.current, "6lu_IchJufA6FUWCR")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    navigate("/applicants");
  };
  return (
    <Home>
      <div>
        <div>
          <form onSubmit={sendEmail} ref={form}>
            <div className="row pt-5 mx-auto">
              <div className="col-8 form-group mx-auto">
                <input
                  value={applicant.firstname}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
                <input
                  value={applicant.email}
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  required
                />
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
                <input
                  value={applicant._id}
                  type="id"
                  className="form-control"
                  placeholder="ID"
                  name="id"
                  required
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
                onClick={() => navigate("/applicants")}
              >
                <button className="btn btn-info">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Home>
  );
}

export default SendWelcomeMail;
