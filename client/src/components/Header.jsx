import "../styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav className="nav">
        <Link to="/login" className="login">
          <button className="loginBtn">Login</button>
        </Link>
        <Link to="/register" className="register">
          <button className="registerBtn">Register</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
