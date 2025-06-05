import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://launchmytech.onrender.com/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Logged in");
      navigate("/admin");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
