import "../styles/createPost.css";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Editor from "./Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3500/api/post/${id}`).then((response) => {
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      });
    });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("id", id);
    // data.set("file", files[0]);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:3500/api/post", {
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.status === 200) {
      navigate(`/post/${id}`);
    }
  };

  return (
    <form className="createPostForm" onSubmit={updatePost}>
      <h1 className="createPostTitle">Edit Post</h1>
      <input
        type="title"
        placeholder="Title"
        className="createPostFormInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        className="createPostFormInput"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        className="createPostFormFile"
        onChange={(e) => setFiles(e.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button className="createPostButton">Edit</button>
    </form>
  );
};

export default CreatePost;
