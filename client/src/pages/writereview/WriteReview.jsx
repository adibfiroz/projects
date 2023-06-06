import Navbar from "../../components/navbar/Navbar";
import "./writereview.css";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import React, { useContext } from "react";
import { Button } from "@mui/material";
import RespNavbar from "../../components/navbar/RespNavbar";
import Footer from "../../components/footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import newRequest from "../../config";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107",
  },
  "& .MuiRating-iconHover": {
    color: "#ffc107",
  },
});
const WriteReview = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/software/find/${id}`);

  const handleReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newReview = {
      userId: user._id,
      softId: id,
      title,
      rating,
      desc,
    };
    try {
      const res = await newRequest.post("/reviews", newReview);
      setLoading(false);
      res.status === 200 && navigate(`/${data.name}-${data._id}`);
    } catch (err) {}
  };

  return (
    <div className="writeReview">
      <div className="container">
        <Navbar />
        <RespNavbar />
        <div className="dFlex">
          <div className="lsoftOn">
            <img
              src={data.sofwareLogo || "/defaultSoftware.png"}
              alt="softImage"
            />
            <div>
              <div className="writeTxt">Write a review on</div>
              <Link to={`/${data.name}-${data._id}`}>
                <div className="softtitle">{data.name}</div>
              </Link>
            </div>
          </div>
          <div className="reviewForm">
            <span className="startxt">Star Rating:</span>
            <StyledRating
              name="customized-color"
              size="large"
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarRoundedIcon fontSize="inherit" />}
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <br />
            <div className="formText">Title your review</div>
            <input
              className="formInput"
              type="text"
              placeholder="Your review title will attract readers, so be creative."
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="formText">
              Describe your overall experience with {data.name}
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What business problems are you solving with monday.com? What benefits have you realized?"
            ></textarea>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                onClick={handleReview}
                disabled={loading}
                className="writeText"
              >
                {loading ? (
                  <img alt="" src="/loading.gif" width="40" height="40" />
                ) : (
                  "Submit Your Review"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriteReview;
