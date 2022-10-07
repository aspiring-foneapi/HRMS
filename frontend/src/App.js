import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./ContextApi";
import Home from "./components/Home";
import { Register } from "./components/Register";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <div className="App">
      <data.Provider value={{ setUserData }}>
        <Router>
          <Routes>
            <Route
              path="/home"
              element={userData && userData._id ? <Home /> : <Login />}
            />
            <Route
              path="/register"
              element={userData && userData._id ? <Register /> : <Login />}
            />
            <Route path="/" element={<Login />} />
            {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        </Router>
      </data.Provider>
    </div>
  );
}

export default App;
