import "./card.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import useFetch from "../../hooks/useFetch";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";

const Card = ({ item }) => {
  const { data, loading, error } = useFetch(
    "/software/getPopular?popular=true&limit=8"
  );

  return (
    <div className="popularCard">
      {loading ? (
        <Skeleton type="popularCard" />
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          {data?.map((item) => (
            <div className="card" key={item._id}>
              <Link to={`/${item.name}-${item._id}`}>
                <img
                  src={item.sofwareLogo || "/defaultSoftware.png"}
                  alt="title"
                />
              </Link>
              <div className="cardDetails">
                <Link to={`/${item.name}-${item._id}`}>
                  <div className="title">{item.name}</div>
                </Link>
                <div className="stars">
                  <Rating
                    name="read-only"
                    size="large"
                    value={Math.round(item.totalStars / item.starNumber)}
                    icon={<StarRoundedIcon fontSize="inherit" />}
                    emptyIcon={
                      <StarRoundedIcon
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                    readOnly
                  />
                  <div className="starCount">
                    {Math.round(item.totalStars / item.starNumber) || 0}
                  </div>
                </div>
                <div className="reviewCount">{item.starNumber} Reviews</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Card;
