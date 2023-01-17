import "../styles/post.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <div className="post">
      <Link to={`/post/${_id}`} className="postRedirect">
        <div className="image">
          <img
            className="postImg"
            src={`http://localhost:3500/${cover}`}
            alt=""
          />
        </div>
      </Link>

      <div className="postContent">
        <Link to={`/post/${_id}`} className="postRedirect">
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
