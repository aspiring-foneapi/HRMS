const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
const { application } = require("express");
app.use(cors());

// MongoDB Atlas
// const mongoUrl =
//   "mongodb+srv://tmq_mckevin:Makmak.11@hrms.ilgspwg.mongodb.net/?retryWrites=true&w=majority";
// Docker
const mongoUrl = "mongodb://localhost:37017/hrmsdb";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("error in connecting to database");
  });
const EmployeeDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
});

const EmployeeDetailsModel = new mongoose.model(
  "EmployeeDetailsModel",
  EmployeeDetailsSchema
);

const ApplicantDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  stage: Number,
});

const ApplicantDetailsModel = new mongoose.model(
  "ApplicantDetailsModel",
  ApplicantDetailsSchema
);

app.post("/applicant-registration", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, stage } = req.body;
  ApplicantDetailsModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id is already registered" });
    } else {
      const user = new ApplicantDetailsModel({
        firstname,
        lastname,
        email,
        stage,
      });
      user.save();
      res.send({ message: "Applicant is Successfully Registered" });
    }
  });
});

app.get("/applicants", (req, res) => {
  ApplicantDetailsModel.find((err, val) => {
    res.send({ data: val });
  });
});

app.get("/applicants/:id", (req, res) => {
  ApplicantDetailsModel.findOne({ _id: req.params.id }, req.body).then(
    (applicant) => {
      res.send(applicant);
      console.log(applicant);
    }
  );
});

app.put("/applicants/:id", (req, res) => {
  console.log(req.params.id);
  try {
    ApplicantDetailsModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).then((applicant) => {
      res.send(applicant);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  EmployeeDetailsModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id is already registered" });
    } else {
      const user = new EmployeeDetailsModel({
        firstname,
        lastname,
        email,
        password,
      });
      user.save();
      res.send({ message: "Successfully Registered" });
    }
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  EmployeeDetailsModel.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successful", user });
      } else {
        res.send({ message: "Password incorrect" });
      }
    } else {
      res.send({ message: "This email is not registered" });
    }
  });
});

app.get("/users", (req, res) => {
  EmployeeDetailsModel.find((err, val) => {
    res.send({ data: val });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
