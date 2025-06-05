import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      setMessage(res.data); // e.g. "User registered"
    } catch (error) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
