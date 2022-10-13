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
                userData && userData._id ? <Home /> || <Register /> : <Login />
              }
            />
            <Route
              path="/employees"
              element={
                userData && userData._id ? <EmployeeDetails /> : <Login />
              }
            />
            <Route
              path="/employees/:email"
              element={userData && userData._id ? <Employee /> : <Login />}
            />
            <Route
              path="/applicants"
              element={
                userData && userData._id ? <ApplicantDetails /> : <Login />
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
              element={userData && userData._id ? <Offboarding /> : <Login />}
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
