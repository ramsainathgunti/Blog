import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import "../styles/postPage.css";

const PostPage = () => {
  const { id } = useParams();
  const username = localStorage.getItem("username");
  const [postInfo, setPostInfo] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3500/api/post/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setPostInfo(data);
      });
    });
  }, []);
  console.log("postInfo", postInfo);
  if (!postInfo) return "";

  return (
    <div className="postPage">
      <h1>{postInfo?.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="postPageAuthor">{`by @${postInfo.author.username}`}</div>
      {username === postInfo.author.username && (
        <div className="edit-row">
          <Link to={`/edit/${id}`}>
            <button className="edit-btn">Edit Post</button>
          </Link>
        </div>
      )}
      <div className="postPageImage">
        <img src={`http://localhost:3500/${postInfo.cover}`} alt="" />
      </div>

      <div
        className="postPageContent"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
