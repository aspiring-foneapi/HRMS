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
              path="/register"
              element={userData && userData._id ? <Register /> : <Login />}
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </data.Provider>
    </div>
  );
}

export default App;
