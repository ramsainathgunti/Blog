import "../styles/post.css";

const Post = () => {
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
        <h2>Is ChatGPT a cybersecurity threat?</h2>
        <p className="info">
          <a className="author">The Grugq, security researcher</a>
          <time>2023-01-14 17:19</time>
        </p>
        <p className="summary">
          Not only have ChatGPT’s human-like abilities taken the internet by
          storm, but it has also set a number of industries on edge: a New York
          school banned ChatGPT over fears that it could be used to cheat,
          copywriters are already being replaced, and reports claim Google is so
          alarmed by ChatGPT’s capabilities that it issued a “code red” to
          ensure the survival of the company’s search business.
        </p>
      </div>
    </div>
  );
};

export default Post;
