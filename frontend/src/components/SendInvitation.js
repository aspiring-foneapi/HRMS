import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SendInvitation() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const form = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        console.log(res);
        setEmployee(res.data);
        console.log(res.data.firstname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_2vnrqsm", form.current, "cDYB4cw1j6sVtsHvZ")
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
    <div>
      <div className="container">
        <form onSubmit={sendEmail} ref={form}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input
                value={employee.firstname}
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                required
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                value={employee.email}
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
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
              onClick={() => navigate("/employees")}
            >
              <button className="btn btn-info">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendInvitation;
