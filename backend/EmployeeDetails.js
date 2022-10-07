const mongoose = require("mongoose");

export const EmployeeDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
});

export const EmployeeDetails = new mongoose.model(
  "EmployeeDetails",
  EmployeeDetailsSchema
);
