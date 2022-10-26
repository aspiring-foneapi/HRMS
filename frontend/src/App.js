import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./ContextApi";
import Home from "./components/Home";
import { Register } from "./components/Register";
import EmployeeDetails from "./components/EmployeeDetails";
import ApplicantDetails from "./components/ApplicantDetails";
import Employee from "./components/Employee";
import Onboarding from "./components/Onboarding";
import Update from "./components/Update";
import Offboarding from "./components/Offboarding";
import Onboard from "./components/Onboard";
import Timeoff from "./components/Timeoff";
import SendInvitation from "./components/SendInvitation";
import SendWelcomeMail from "./components/SendWelcomeMail";
import Dashboard from "./components/Dashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeDetailsDashboard from "./components/EmployeeDetailsDashboard";
import UserDashboard from "./components/UserDashboard";
import EditInformation from "./components/EditInformation";

function App() {
  const [userData, setUserData] = useState();
  return (
    <div className="App">
      <data.Provider value={{ setUserData }}>
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <Dashboard />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/employees/:id" element={<Employee />} />
            <Route
              path="/employees"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <EmployeeDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/sendinvite/:id"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <SendInvitation />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/sendwelcomemail/:id"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <SendWelcomeMail />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/timeoff/:id"
              element={
                (userData && userData._id && userData.role === "Admin") ||
                "Employee" ? (
                  <Timeoff />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/applicants"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <ApplicantDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <Onboarding />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/offboarding-employees"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <Offboarding />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/applicants/:id" element={<Update />} />
            <Route path="/applicants/onboard/:id" element={<Onboard />} />
            <Route
              path="/register"
              element={
                userData && userData._id && userData.role === "Admin" ? (
                  <Register />
                ) : <Login /> ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/" element={<Login />} />
            <Route
              path="/userdashboard/:id"
              element={
                userData && userData._id && userData.role === "Employee" ? (
                  <UserDashboard />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/employeedetails/:id"
              element={
                userData && userData._id && userData.role === "Employee" ? (
                  <EmployeeDetailsDashboard />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/editinformation/:id" element={<EditInformation />} />
          </Routes>
        </Router>
      </data.Provider>
    </div>
  );
}

export default App;
