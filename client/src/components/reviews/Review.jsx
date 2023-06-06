import "./review.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext, useState } from "react";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import newRequest from "../../config";
const Review = ({ review, reFetch }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data } = useFetch(`/users/find/${review.userId}`);
  const [liked, setliked] = useState(review?.likes.includes(user?._id));
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user) return navigate("/login");

    if (review?.userId === user?._id) {
      alert("You cannot rate your own review!");
    } else {
      try {
        if (liked) {
          await newRequest.put(`/users/unlike/${review._id}`, {
            userId: user._id,
          });
          dispatch({ type: "unliked", payload: user._id });
        } else {
          await newRequest.put(`/users/like/${review._id}`, {
            userId: user._id,
          });
          dispatch({ type: "liked", payload: user._id });
        }
        setliked(!liked);
        reFetch();
      } catch (err) {}
    }
  };

  return (
    <div className="review">
      <div className="lUser">
        <img src={data.profilePic || "/userDefault.jpg"} alt="userImage" />
        <div className="userName">{data.username}</div>
      </div>
      <div className="rUserReview">
        <div className="reviewTitle">{review.title}</div>
        <div className="reviewStar">
          <div className="stars">
            <Rating
              name="read-only"
              size="large"
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={
                <StarRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              value={review.rating}
              readOnly
            />
          </div>
          <div className="timeago">{moment(review.createdAt).fromNow()}</div>
        </div>
        <div className="desc">{review.desc}</div>
        <div className="likeReview">
          <div onClick={handleClick}>
            {liked ? (
              <ThumbUpIcon className="thumbUp" />
            ) : (
              <ThumbUpAltOutlinedIcon className="thumbUp" />
            )}
          </div>
          <div className="likeCount">{review.likes.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
