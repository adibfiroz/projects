import React from "react";
import "./popularCard.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Link } from "react-router-dom";

const PopularCard = ({ popSoft }) => {
  return (
    <div className="popularRevCard">
      <div className="popflex">
        <div className="lsoft">
          <img
            src={popSoft.sofwareLogo || "/defaultSoftware.png"}
            alt="soft img"
          />
        </div>
        <div className="rdetails">
          <Link to={`/write-review/${popSoft._id}`}>
            <div className="softpop">{popSoft.name}</div>
          </Link>
          <div className="rateflex">
            <div>
              <StarRoundedIcon className="iconstarpop" />
              <span className="countstar">
                {Math.round(popSoft.totalStars / popSoft.starNumber || 0)}
              </span>
            </div>
            <div className="reviewCount">{popSoft.starNumber} Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
