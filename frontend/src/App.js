import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { useState } from "react";
import Register from "./Components/Register/Register";

function App() {
  const [User, setUser] = useState(localStorage.getItem('token'));
  return (
    <>
      <Router>
        <Navbar User={User} setUser={setUser}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route exact path="/signup" element={<Signup setUser={setUser} />} />
          <Route exact path="/register" element={<Register User={User} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
