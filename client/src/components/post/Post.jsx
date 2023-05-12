import { Link } from "react-router-dom";
import "./post.css";
import parse from "html-react-parser";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      </Link>
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">{post.categories}</span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      {parse(`<p className="postDesc">${post.desc}</p>`)}
    </div>
  );
}
