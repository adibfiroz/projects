import "./review.css";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Reviews = ({ softId }) => {
  const { data, reFetch } = useFetch(`/reviews/${softId}`);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleForOrLogin = () => {
    if (user) {
      navigate(`/write-review/${softId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="reviewUser">
      {data.length ? (
        data.map((review) => (
          <Review reFetch={reFetch} key={review._id} review={review} />
        ))
      ) : (
        <p className="noReview">
          There are no reviews available. Be the first to
          <span onClick={handleForOrLogin}> Write a Review</span>
        </p>
      )}
    </div>
  );
};

export default Reviews;
