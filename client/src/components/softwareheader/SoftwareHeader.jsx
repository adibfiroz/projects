import "./softwareheader.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import Rating from "@mui/material/Rating";
import newRequest from "../../config";

const SoftwareHeader = (props) => {
  const { user, dispatch } = useContext(AuthContext);
  const [save, setSave] = useState(user?.savedSoftwares.includes(props.sId));
  const navigate = useNavigate();

  const { data } = useFetch(`/reviews/${props.sId}`);

  const isFound = data.some((element) => {
    if (element.userId === user?._id) {
      return true;
    }
    return false;
  });

  const handleForOrLogin = () => {
    if (user) {
      navigate(`/write-review/${props.sId}`);
    } else {
      navigate("/login");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    try {
      if (save) {
        await newRequest.put(`/users/remove/${props.sId}`, {
          userId: user._id,
        });
        dispatch({ type: "REMOVE", payload: props.sId });
      } else {
        await newRequest.put(`/users/save/${props.sId}`, {
          userId: user._id,
        });
        dispatch({ type: "SAVED", payload: props.sId });
      }
      setSave(!save);
    } catch (err) {}
  };

  return (
    <div className="SoftwareHeader">
      <div className="contianer" style={{ position: "relative" }}>
        <div className="dFlex">
          <div className="lHeader">
            <img alt={props.name} src={props.Slogo || "/defaultSoftware.png"} />
            <div className="softTile">{props.name}</div>
          </div>
          <div className="rHeader">
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
                value={Math.round(props.totalstar / props.starno)}
                readOnly
              />
              <div className="starCount">
                {Math.round(props.totalstar / props.starno) || 0}/5
              </div>
            </div>
            <div className="dFlex">
              <div className="saveSoft" onClick={handleClick}>
                {save ? (
                  <FavoriteRoundedIcon className="fillIcon" />
                ) : (
                  <FavoriteBorderRoundedIcon className="unfillIcon" />
                )}
              </div>
              <span className="reviewCount">{data?.length} Reviews</span>
            </div>
          </div>
          <div className="writeButton">
            {isFound ? (
              ""
            ) : (
              <Button onClick={handleForOrLogin} className="writeText">
                Write a Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareHeader;
