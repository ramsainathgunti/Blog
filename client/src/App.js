import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";

function App() {
  const { userInfo } = useContext(UserContext);

  const username = localStorage.getItem("username");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={username ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  );
}

export default App;
