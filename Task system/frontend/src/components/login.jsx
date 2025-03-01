


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  forgotButton: {
    marginTop: "10px",
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/task/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      alert("Login successful!");
      navigate("/taskManager");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>
      </form>

      <button onClick={() => navigate("/forgotPassword")} style={styles.forgotButton}>
        Forgot Password
      </button>
    </div>
  );
};

export default Login;
