import "../styles/register.css";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3500/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Registration Successful");
    } else {
      alert("Registration failed");
    }
    const data = await response.json();
    console.log(data);
  };

  return (
    <form className="registerForm" onSubmit={registerForm}>
      <h1 className="registerTitle">Register</h1>
      <input
        type="text"
        placeholder="username"
        className="registerInput"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="registerInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="rBtn">Register</button>
    </form>
  );
};

export default Register;
