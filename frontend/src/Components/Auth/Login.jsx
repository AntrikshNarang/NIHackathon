import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [Credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [ErrorMsg, setErrorMsg] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    if (Credentials.email.length === 0 || Credentials.password.length === 0) {
      return setErrorMsg("Fields can't be left empty!");
    }
    if (Credentials.password.length <= 8) {
      return setErrorMsg("Weak Password");
    }
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setUser(json.authToken);
      navigate('/')
    } else {
      setErrorMsg(json.error);
    }
  }
  return (
    <div className={styles.mainDiv}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-floating mb-3">
          <input
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            value={Credentials.email}
            className="form-control bg-dark"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            value={Credentials.password}
            className="form-control bg-dark"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {ErrorMsg && <p className={styles.errorMsg}>Error: {ErrorMsg}</p>}
        <button className="btn btn-light" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
