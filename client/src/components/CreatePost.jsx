import "../styles/createPost.css";
import Editor from "./Editor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);

    data.set("content", content);
    data.set("file", files[0]);
    const response = await fetch("http://localhost:3500/api/post", {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: data,
    });
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <form className="createPostForm" onSubmit={createNewPost}>
      <h1 className="createPostTitle">Create Post</h1>
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
      <button className="createPostButton">Post</button>
    </form>
  );
};

export default CreatePost;
