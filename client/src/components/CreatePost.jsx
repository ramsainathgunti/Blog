import "../styles/createPost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", files[0]);
    data.set("content", content);
    const response = await fetch("http://localhost:3500/api/post", {
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
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
      <button className="createPostButton">Post</button>
    </form>
  );
};

export default CreatePost;
