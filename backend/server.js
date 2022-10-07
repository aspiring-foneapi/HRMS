const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
