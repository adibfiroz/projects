import "./profilereview.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const ProfileReview = ({ userRev }) => {
  const { data } = useFetch(`/software/find/${userRev.softId}`);

  return (
    <div>
      <div className="ProfileReview">
        <div className="reviewOn">
          Reviewed
          <Link to={`/${data?.name}-${data?._id}`}>
            <span
              style={{
                color: "#1859B4",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {data?.name}
            </span>
          </Link>
        </div>
        <div className="reviewBox">
          <div className="revTitle">{userRev?.title}</div>
          <div className="reviewStar">
            <div className="stars">
              <Rating
                name="read-only"
                size="large"
                icon={<StarRoundedIcon fontSize="inherit" />}
                emptyIcon={
                  <StarRoundedIcon
                    style={{ opacity: 0.55 }}
                    fontSize="inherit"
                  />
                }
                value={userRev?.rating}
                readOnly
              />
            </div>
            <div className="timeago">
              {moment(userRev?.createdAt).fromNow()}
            </div>
          </div>
          <div className="profileRevDesc">
            {userRev?.desc}
            <span style={{ color: "#1859B4", fontWeight: "bold" }}>
              ...Read More
            </span>
          </div>
          <div className="likeReview" style={{ marginBottom: 0 }}>
            <div>
              <ThumbUpAltOutlinedIcon className="thumbUp" />
            </div>
            <div className="likeCount">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;
