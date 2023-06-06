import "./listingcard.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import newRequest from "../../config";

const ListingCard = ({ item }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [save, setSave] = useState(user?.savedSoftwares.includes(item._id));
  const navigate = useNavigate();

  const handleClick = async (id) => {
    if (!user) return navigate("/login");

    try {
      if (save) {
        await newRequest.put(`/users/remove/${id}`, {
          userId: user._id,
        });
        dispatch({ type: "REMOVE", payload: id });
      } else {
        await newRequest.put(`/users/save/${id}`, {
          userId: user._id,
        });
        dispatch({ type: "SAVED", payload: id });
      }
      setSave(!save);
    } catch (err) {}
  };

  return (
    <div>
      <div className="listingcard">
        <div className="listTop">
          <div className="sofwtareContent">
            <div className="softImg">
              <img
                alt="softwaredefault"
                src={item.sofwareLogo || "/defaultSoftware.png"}
              />
            </div>
            <div className="softDeatials">
              <Link to={`/${item.name}-${item._id}`}>
                <div className="softTitle">{item.name}</div>
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
            <div className="like" onClick={() => handleClick(item._id)}>
              {save ? (
                <FavoriteRoundedIcon className="fillIcon" />
              ) : (
                <FavoriteBorderRoundedIcon className="unfillIcon" />
              )}
            </div>
          </div>
        </div>
        <div className="softAbout">
          <p>
            {item.whatIs.substring(0, 300)}...
            <Link to={`/${item.name}-${item._id}`}>Learn More</Link>
          </p>
        </div>
        {item.popular && <span className="poptxt">Popular</span>}
      </div>
    </div>
  );
};

export default ListingCard;
