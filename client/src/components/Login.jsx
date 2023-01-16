import "../styles/login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const getProfile = async () => {
    await fetch("http://localhost:3500/api/auth/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  };

  const loginForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3500/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("username", data.username);
      setUserInfo(data);
      //await getProfile();
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form className="loginForm" onSubmit={loginForm}>
      <h1 className="loginTitle">Login</h1>
      <input
        type="text"
        placeholder="username"
        className="loginInput"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="loginInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="lBtn">Login</button>
    </form>
  );
};

export default Login;
