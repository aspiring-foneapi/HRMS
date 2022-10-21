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
import Sidebar from "./components/Sidebar";

function App() {
  const [userData, setUserData] = useState();
  return (
    <div className="App">
      <data.Provider value={{ setUserData }}>
        <Router>
          <Routes>
            <Route
              path="/home"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/employees/:id"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Employee />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/employees"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <EmployeeDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/sendinvite/:id"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <SendInvitation />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/timeoff/:id"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Timeoff />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/applicants"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <ApplicantDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Onboarding />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/offboarding-employees"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Offboarding />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/applicants/:id"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Update />
                ) : <Login /> ? (
                  <ApplicantDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/applicants/onboard/:id"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Onboard />
                ) : <Login /> ? (
                  <ApplicantDetails />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                userData && userData._id && userData.role === "admin" ? (
                  <Register />
                ) : <Login /> ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </data.Provider>
    </div>
  );
}

export default App;
