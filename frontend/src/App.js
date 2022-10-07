import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./ContextApi";
import Home from "./components/Home";

function App() {
  const [userData, setUserData] = useState({});
  console.log(userData);
  return (
    <div className="App">
      <data.Provider value={{ setUserData }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={userData && userData._id ? <Home /> : <Login />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </data.Provider>
    </div>
  );
}

export default App;
