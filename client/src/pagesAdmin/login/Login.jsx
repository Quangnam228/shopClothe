import "./login.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCallsAdmin";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="loginStyle">
      <div className="loginWrapper">
        <h1 className="loginTitle">Sign In</h1>
        <input
          className="inputLogin"
          type="text"
          placeholder="email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputLogin"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btnLogin"
          onClick={handleClick}
          style={{ padding: 10, width: 100 }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
