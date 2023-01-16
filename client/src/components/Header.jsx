import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = async () => {
    await fetch("http://localhost:3500/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("username");
    setUserInfo(null);
    navigate("/login");
  };

  const username = localStorage.getItem("username");

  return (
    <header className="header">
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav className="nav">
        {username && (
          <>
            <Link to="/createPost">
              <button className="createPostBtn"> Create Post</button>
            </Link>
            <button className="loginUserBtn" onClick={logout}>
              Logout {username}
            </button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login">
              <button className="loginBtn">Login</button>
            </Link>
            <Link to="/register" className="register">
              <button className="registerBtn">Register</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
