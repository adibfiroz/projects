import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import { useEffect } from "react";

const Home = () => {
  const { data } = useFetch("/users");

  const [software, setSoftware] = useState([]);
  const [cats, setCats] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getSoftwares = async () => {
      const res = await axios.get("/software");
      setSoftware(res.data);
    };
    getSoftwares();
  });

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get("/reviews");
      setReviews(res.data);
    };
    getReviews();
  });

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="content">
          <div className="box">
            <span>USERS</span>
            <div className="count">{data?.length}</div>
            <div className="dFlex">
              <Link to="/users">
                <div className="seeAll">See All Users</div>
              </Link>
              <div className="userIcon">
                <PersonOutlineIcon className="Icon" />
              </div>
            </div>
          </div>

          <div className="box">
            <span>CATEGORIES</span>
            <div className="count">{cats?.length}</div>
            <div className="dFlex">
              <Link to="/categories">
                <div className="seeAll">See All Categories</div>
              </Link>
              <div className="userIcon">
                <CategoryIcon className="Icon" />
              </div>
            </div>
          </div>

          <div className="box">
            <span>SOFTWARES</span>
            <div className="count">{software?.length}</div>
            <div className="dFlex">
              <Link to="/software">
                <div className="seeAll">See All Softwares</div>
              </Link>
              <div className="softIcon">
                <StoreIcon
                  className="IconStore"
                  style={{
                    color: "purple",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="box">
            <span>REVIEWS</span>
            <div className="count">{reviews?.length}</div>
            <div className="dFlex">
              <Link to="/reviews">
                <div className="seeAll">See All Reviews</div>
              </Link>
              <div className="softIcon">
                <ReviewsRoundedIcon
                  className="IconStore"
                  style={{
                    color: "purple",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
