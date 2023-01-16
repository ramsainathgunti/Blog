import React from "react";
import Post from "./Post";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const response = await fetch("http://localhost:3500/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </>
  );
};

export default Home;
