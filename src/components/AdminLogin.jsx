import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() { 
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 

const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  if (!username || !password) {
    setErrorMsg("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {//200
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    if (data.role === "ADMIN") {
      navigate("/admin");//admin dashboard 
    } else {
      setErrorMsg("Access denied. Only ADMIN users are allowed.");
    }
  } catch (error) {
    setErrorMsg("Login failed. Please check your credentials.");
    console.error("Login error:", error);
  }
};


  return (
    <div className="login-page">
      <div className="top-right-global">
        <button className="nav-home" onClick={() => navigate("/")}>Home</button>
        <button className="nav-home" onClick={() => navigate("/userLogin")}>User</button>
      </div>

      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
