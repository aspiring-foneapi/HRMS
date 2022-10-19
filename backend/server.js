const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

// const { authPage } = require("./middlware");

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
  role: String,
  email: { type: String, required: true, unique: true },
  password: String,
  joindate: String,
  timeoff: Number,
  timeofffromdate: String,
  timeofftodate: String,
  leavefromdate: String,
  leavetodate: String,
});

const EmployeeDetailsModel = new mongoose.model(
  "EmployeeDetailsModel",
  EmployeeDetailsSchema
);

app.post("/register", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, role, password } = req.body;
  EmployeeDetailsModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id is already registered" });
    } else {
      const user = new EmployeeDetailsModel({
        firstname,
        lastname,
        email,
        role,
        password,
        timeoff: 5,
        joindate: new Date(),
      });
      user.save();
      res.send({ message: "Successfully Registered" });
    }
  });
});

app.post("/login", bodyParser.urlencoded({ extended: false }), (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  EmployeeDetailsModel.findOne(
    { email: email, role: (role = "admin") },
    (err, user) => {
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login successful", user });

          console.log("user", email);
        } else {
          res.send({ message: "Password incorrect" });
        }
      } else {
        res.send({ message: "This email is not registered as admin" });
      }
    }
  );
});

app.get("/users", (req, res) => {
  EmployeeDetailsModel.find((err, val) => {
    res.send({ data: val });
  });
});

app.get("/users/:id", (req, res) => {
  EmployeeDetailsModel.findOne({ _id: req.params.id }, req.body).then(
    (employee) => {
      res.send(employee);
      console.log(employee);
    }
  );
});

app.put("/users/:id", (req, res) => {
  console.log(req.params.id);
  try {
    EmployeeDetailsModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).then((employee) => {
      res.send(employee);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.params.id);

  try {
    EmployeeDetailsModel.findOneAndDelete({ _id: req.params.id }).then(
      (employee) => {
        res.send(employee);
      }
    );
  } catch (error) {
    res.send(alert("Error in deleting"));
  }
});

const ApplicantDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  stage: Number,
  joindate: String,
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
        joindate: new Date(),
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

app.delete("/applicants/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.params.id);

  try {
    ApplicantDetailsModel.findOneAndDelete({ _id: req.params.id }).then(
      (applicant) => {
        res.send(applicant);
      }
    );
  } catch (error) {
    res.send(alert("Error in deleting"));
  }
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

const OffboardingEmployeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  role: String,
  email: { type: String, required: true, unique: true },
  password: String,
  joindate: String,
});

const OffboardingEmployeeModel = new mongoose.model(
  "OffboardingEmployeeModel",
  OffboardingEmployeeSchema
);

app.post("/offboarding", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, role, password } = req.body;
  OffboardingEmployeeModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id is already registered" });
    } else {
      const user = new OffboardingEmployeeModel({
        firstname,
        lastname,
        email,
        role,
        password,
        joindate: new Date(),
      });
      user.save();
      res.send({ message: "Applicant is Successfully Registered" });
    }
  });
});

app.get("/offboarding-employees", (req, res) => {
  OffboardingEmployeeModel.find((err, val) => {
    res.send({ data: val });
  });
});

app.get("/offboarding-employees/:id", (req, res) => {
  OffboardingEmployeeModel.findOne({ _id: req.params.id }, req.body).then(
    (applicant) => {
      res.send(applicant);
      console.log(applicant);
    }
  );
});

app.delete("/offboarding-employees/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.params.id);

  try {
    OffboardingEmployeeModel.findOneAndDelete({ _id: req.params.id }).then(
      (employee) => {
        res.send(employee);
      }
    );
  } catch (error) {
    res.send(alert("Error in deleting"));
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
