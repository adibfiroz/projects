import * as React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import UserProfile from "../../components/userprofile/UserProfile";
import RespNavbar from "../../components/navbar/RespNavbar";
import { AuthContext } from "../../context/AuthContext";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Fade, Tooltip } from "@mui/material";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import ProfileReview from "../../components/profilereview/ProfileReview";
import ReviwedCat from "./ReviwedCat";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { data, loading } = useFetch(`/users/reviews/${user._id}`);

  return (
    <div className="profile">
      <RespNavbar />
      <UserProfile />

      <div className="profileHeader">
        <div className="container dFlex">
          <div className="navLinks active">Reviews</div>
          <Link to="/edit-profile">
            <div className="navLinks">Edit Profile</div>
          </Link>
          <Link to="/software-saved">
            <div className="navLinks">Software Saved</div>
          </Link>
          <div className="settings">
            <Link to="/" onClick={() => dispatch({ type: "LOGOUT" })}>
              <Tooltip
                className="settIcons"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="LOGOUT"
                arrow
              >
                <span>
                  <ExitToAppOutlinedIcon />
                </span>
              </Tooltip>
            </Link>

            <Tooltip
              className="settIcons"
              title="NOTIFICATION"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <span>
                <NotificationsActiveOutlinedIcon />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="reviewpage">
        <div className="container">
          <div className="dFlex">
            <div className="lBio">
              <div className="bioTitle">first name</div>
              <input
                className="userInfo"
                type="text"
                placeholder={user.username}
              />
              <div className="bioTitle">last name</div>
              <input
                className="userInfo"
                type="text"
                placeholder="Naruto uzumaki"
              />
              <div className="bioTitle">BUSINESS EMAIL ADDRESS</div>
              <input
                className="userInfo"
                type="text"
                placeholder={user.email}
              />
              <div className="bioTitle">ADDRESS</div>
              <div className="userInfo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Impedit, omnis.
              </div>
            </div>
            <div className="reviews">
              <h2>Reviews</h2>
              {data.length ? (
                loading ? (
                  "loading"
                ) : (
                  data.map((userRev) => (
                    <ProfileReview key={userRev._id} userRev={userRev} />
                  ))
                )
              ) : (
                <p className="noReview">
                  There are no reviews available.
                  <Link
                    style={{ color: "#1859B4", fontWeight: 600 }}
                    to="/selectSoftwares"
                  >
                    {" "}
                    Write a Review
                  </Link>
                </p>
              )}
            </div>
            <div className="reviewSidebar">
              <div className="sidebarBox">
                <h3>Reviewed Categories</h3>
                <div className="sFlex">
                  {data.map((revCat) => (
                    <ReviwedCat key={revCat._id} revCat={revCat} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
