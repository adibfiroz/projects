import Navbar from "../../components/navbar/Navbar";
import RespNavbar from "../../components/navbar/RespNavbar";
import "./readallreview.css";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SoftwareHeader from "../../components/softwareheader/SoftwareHeader";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { Button } from "@mui/material";
import ArticleCard from "../../components/articlecard/ArticleCard";
import Footer from "../../components/footer/Footer";
import GoToTop from "../../components/gototop/GoToTop";
import useFetch from "../../hooks/useFetch";
import Reviews from "../../components/reviews/Reviews";

const ScrollTo = ({ id, title, active, setSelected, to }) => {
  return (
    <a
      href={`#${to}`}
      className={active ? "softList active" : "softList"}
      onClick={() => setSelected(id)}
    >
      {title}
    </a>
  );
};

const list = [
  {
    id: "about",
    title: "About",
    to: "about",
  },
  {
    id: "price",
    title: "Price",
    to: "price",
  },
  {
    id: "features",
    title: "Features",
    to: "features",
  },
  {
    id: "reviews",
    title: "Reviews",
    to: "reviews",
  },
  {
    id: "articles",
    title: "Articles",
    to: "articles",
  },
];

const ReadAllReview = (props) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [age, setAge] = React.useState("");
  const location = useLocation();
  const id = location.pathname.split("-")[1];
  const [selected, setSelected] = useState("about");
  const { data } = useFetch(`/software/find/${id}`);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  const handleSelect = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    document.body.classList.add("scrollHide");
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div className="ReadAllReview">
      {open && (
        <div className="slider">
          <CloseRoundedIcon
            className="close"
            onClick={() =>
              setOpen(false, document.body.classList.remove("scrollHide"))
            }
          />
          <ArrowBackIosNewRoundedIcon
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <ArrowForwardIosRoundedIcon
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      <RespNavbar />
      <div className="container">
        <Navbar />
        <div className="breadcrumb rar">
          <Link to="/">Home</Link>
          <KeyboardArrowRightIcon
            className="arrowIcon"
            style={{ fontSize: "20px" }}
          />

          <Link to={`/softwares?catName=${data?.catName}`}>{data.catName}</Link>

          <KeyboardArrowRightIcon
            className="arrowIcon"
            style={{ fontSize: "20px" }}
          />
          <span>{data.name}</span>
        </div>
      </div>

      <SoftwareHeader
        totalstar={data.totalStars}
        starno={data.starNumber}
        name={data.name}
        Slogo={data.sofwareLogo}
        sId={id}
      />
      <div className="tabList container">
        {list.map((item) => (
          <ScrollTo
            title={item.title}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
            key={item.id}
            to={item.to}
          />
        ))}
      </div>

      <div className="softwareDetails container" id="about">
        <div className="dFlex">
          <div className="lDetials">
            <h2>What is {data.name} ?</h2>
            <br />
            {data.whatIs}
            <div>
              <br />
            </div>
            <h2>Contact Details</h2>
            <br />
            Website :{data.website}
            <br></br> Founded in : 2001
            <br /> Located in : {data.address}
          </div>
          {data.photos ? (
            <div className="rPhoto">
              <div className="imgGallery">
                {data.photos.map((photo, i) => (
                  <img
                    key={i}
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                  />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {data?.price ? (
        <div className="price" id="price">
          <div className="container">
            <div className="pricing">
              <span>Starting Price</span> : starts at ${data.price} &nbsp;&nbsp;
              <i>per month</i>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="container">
        <div className="softSupport">
          <div className="supportCard">
            <h3>Deployment</h3>
            <ul>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
            </ul>
          </div>
          <div className="supportCard">
            <h3>Deployment</h3>
            <ul>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
            </ul>
          </div>
          <div className="supportCard">
            <h3>Deployment</h3>
            <ul>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
            </ul>
          </div>
          <div className="supportCard">
            <h3>Deployment</h3>
            <ul>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Mobile - Android
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="features" id="features">
        <div className="container">
          <h2>{data.name} Features</h2>
          <div className="featureList">
            <ul>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Management featureList
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Calendar
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Management Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
              <li>
                <CheckCircleOutlinedIcon className="checkIcon" />
                Calendar Management
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container softRating">
        <div className="lRatings">
          <div className="dFlex">
            <h2>{data.name} Ratings</h2>
            <FormControl className="sortSelect">
              <Select value={age} onChange={handleSelect} displayEmpty>
                <MenuItem value="">Latest</MenuItem>
                <MenuItem value={20}>Most Helpful</MenuItem>
                <MenuItem value={30}>Ratings</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="ratingBeakup">
            <div className="lBreak">
              <div className="innerRow">
                <div className="txtField">Customer Service</div>
                <div className="rateColor">
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg1"></span>
                  <span className="bg1"></span>
                </div>
              </div>
              <div className="innerRow">
                <div className="txtField">Delivery Timeliness</div>
                <div className="rateColor">
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg1"></span>
                  <span className="bg1"></span>
                </div>
              </div>
              <div className="innerRow">
                <div className="txtField">Reliability</div>
                <div className="rateColor">
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg1"></span>
                  <span className="bg1"></span>
                </div>
              </div>
            </div>
            <div className="rBreak">
              <div className="innerRow">
                <div className="txtField">Product Quality</div>
                <div className="rateColor">
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg1"></span>
                  <span className="bg1"></span>
                </div>
              </div>
              <div className="innerRow">
                <div className="txtField">App & Websites</div>
                <div className="rateColor">
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg0"></span>
                  <span className="bg1"></span>
                  <span className="bg1"></span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="softReview" id="reviews">
            {data.name} Reviews
          </h2>
          <Reviews softId={id} />

          <div className="pagination">
            <Pagination count={6} color="primary" />
          </div>
        </div>
        <div className="rRatings">
          <div className="buisness">
            <img alt="business" src="/addsoft.png" />
            <div className="txtBlue">Have something new for us ?</div>
            <p>
              Add a new software, and manage its profile. Claiming is free, only
              take a few minutes.
            </p>
            <Button className="claimButton">CLAIM YOUR LISTING</Button>
          </div>
        </div>
      </div>

      <div className="topArticle">
        <h3 style={{ textAlign: "left" }}>Top Recommended Articles</h3>
        <div className="article" id="articles">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>

      <Footer />
      <GoToTop />
    </div>
  );
};

export default ReadAllReview;
