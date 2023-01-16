import "../styles/post.css";
import { formatISO9075 } from "date-fns";

const Post = ({ title, summary, content, cover, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          className="postImg"
          src="https://techcrunch.com/wp-content/uploads/2023/01/GettyImages-1320103102.jpg?w=1390&crop=1"
          alt=""
        />
      </div>

      <div className="postContent">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">The Grugq, security researcher</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
