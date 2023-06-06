import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import RespNavbar from "../../components/navbar/RespNavbar";
import SavedSoftware from "../../components/savedsoftware/SavedSoftware";
import UserProfile from "../../components/userprofile/UserProfile";
import { AuthContext } from "../../context/AuthContext";
const SoftwareSaved = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="SoftwareSaved">
      <RespNavbar />
      <UserProfile />
      <div className="profileHeader">
        <div className="container dFlex">
          <Link to="/profile">
            <div className="navLinks">Reviews</div>
          </Link>
          <Link to="/edit-profile">
            <div className="navLinks">Edit Profile</div>
          </Link>
          <Link to="/software-saved">
            <div className="navLinks active">Software Saved</div>
          </Link>
          <div className="navLinks">Logout</div>
        </div>
      </div>

      <div className="savedbox">
        <div className="container">
          <div className="dFlex mFlex">
            <div className="lBio">
              <div className="bioTitle">first name</div>
              <input
                className="userInfo"
                type="text"
                placeholder="Naruto uzumaki"
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
                placeholder="Naruto uzumaki"
              />
              <div className="bioTitle">ADDRESS</div>
              <div className="userInfo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Impedit, omnis.
              </div>
            </div>
            <div className="savedSoft">
              <SavedSoftware saveSoft={user._id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SoftwareSaved;
