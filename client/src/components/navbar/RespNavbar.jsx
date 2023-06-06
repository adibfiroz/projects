import React, { useContext, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const RespNavbar = (props) => {
  const [open, setOpen] = useState(false);
  const [opensearch, setOpenSearch] = useState(false);
  const { data, loading } = useFetch("/software");
  const { user, dispatch } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    setShowSearch(e.target.value);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    setOpen(false, document.body.classList.remove("scrollHide"));
  };

  const filterList = data.filter((search) =>
    search.name.toLowerCase().includes(showSearch.toLowerCase())
  );

  const handleClear = (e) => {
    setShowSearch("");
    setOpenSearch(false);
  };

  const handleWrite = () => {
    if (user) {
      navigate("/selectSoftwares");
      setOpen(false);
      document.body.classList.remove("scrollHide");
    } else {
      navigate("/login");
      setOpen(false);
      document.body.classList.remove("scrollHide");
    }
  };

  return (
    <div className="respNavbar">
      <div className="mContainer">
        <div className="Lcontents">
          <Link to="/">
            <span className="logo">Bluwberry</span>
          </Link>
        </div>
        <div className="Rcontents">
          <SearchRoundedIcon onClick={() => setOpenSearch(true)} />
          <MenuRoundedIcon
            className="icon"
            onClick={() =>
              setOpen(true, document.body.classList.add("scrollHide"))
            }
          />
        </div>
      </div>

      {opensearch && (
        <div className="searchModal">
          <div className="resSearch">
            <ArrowBackIosRoundedIcon
              className="searchIcons"
              onClick={() => setOpenSearch(false)}
            />
            <div className="shortLogo">BB</div>
            <input
              type="text"
              placeholder="Search Softwares"
              value={showSearch}
              onChange={onSearch}
            />
            {showSearch ? (
              <CloseRoundedIcon
                className="searchIcons"
                onClick={() => setShowSearch("")}
              />
            ) : (
              <SearchRoundedIcon className="searchIcons" />
            )}
          </div>
          <div className="resultText">
            {showSearch.length > 1 && (
              <ul>
                {loading ? (
                  "loading"
                ) : (
                  <>
                    {filterList.map((search) => (
                      <li key={search._id} onClick={handleClear}>
                        <Link to={`/${search.name}-${search._id}`}>
                          {search.name}

                          <img
                            className="serachLogo"
                            src={search.sofwareLogo}
                            alt=""
                          />
                        </Link>
                        <Link
                          to={`/softwares?catName=${search.catName}`}
                          className="cat"
                        >
                          {search.catName}
                        </Link>
                      </li>
                    ))}
                    {filterList.length === 0 && (
                      <li className="notFound">
                        No results found ("{showSearch}")
                      </li>
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      )}

      <div>
        <div
          className={"backLayer " + (open && "active")}
          onClick={() =>
            setOpen(false, document.body.classList.remove("scrollHide"))
          }
        ></div>
        <div className={"modal " + (open && "active")}>
          <div className="modalContent">
            <div className="top">
              {!user ? (
                <ul>
                  <li
                    style={{
                      color: "#1859B4",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                  >
                    MENU
                  </li>
                  <hr />
                  <Link
                    to="/"
                    onClick={() =>
                      setOpen(
                        false,
                        document.body.classList.remove("scrollHide")
                      )
                    }
                  >
                    <li>
                      <HomeOutlinedIcon className="menuIcon" />
                      Home
                    </li>
                  </Link>
                  <Link
                    to="/categories"
                    onClick={() =>
                      setOpen(
                        false,
                        document.body.classList.remove("scrollHide")
                      )
                    }
                  >
                    <li>
                      <CategoryOutlinedIcon className="menuIcon" />
                      Software Categories
                    </li>
                  </Link>
                  <li>
                    <PanoramaOutlinedIcon className="menuIcon" />
                    Advertise with us
                  </li>
                  <Link onClick={handleWrite}>
                    <li>
                      <RateReviewOutlinedIcon className="menuIcon" />
                      Write a Review
                    </li>
                  </Link>
                  <hr />
                  <Link
                    to="/login"
                    onClick={() =>
                      setOpen(
                        false,
                        document.body.classList.remove("scrollHide")
                      )
                    }
                  >
                    <li>
                      <LoginOutlinedIcon className="menuIcon" />
                      Login In / Sign Up
                    </li>
                  </Link>
                </ul>
              ) : (
                <>
                  <div className="userSection">
                    <Link to={`/profile/?user=${user.username}`}>
                      <img
                        src={user.profilePic || "/userDefault.jpg"}
                        alt="userImg"
                      />
                    </Link>
                    <div className="userMenu">{user.username}</div>
                  </div>
                  <ul>
                    <Link
                      to="/"
                      onClick={() =>
                        setOpen(
                          false,
                          document.body.classList.remove("scrollHide")
                        )
                      }
                    >
                      <li>
                        <HomeOutlinedIcon className="menuIcon" />
                        Home
                      </li>
                    </Link>
                    <Link
                      to={`/profile/?user=${user.username}`}
                      onClick={() =>
                        setOpen(
                          false,
                          document.body.classList.remove("scrollHide")
                        )
                      }
                    >
                      <li>
                        <AccountCircleOutlinedIcon className="menuIcon" />
                        Profile
                      </li>
                    </Link>
                    <Link
                      to="/categories"
                      onClick={() =>
                        setOpen(
                          false,
                          document.body.classList.remove("scrollHide")
                        )
                      }
                    >
                      <li>
                        <CategoryOutlinedIcon className="menuIcon" />
                        Software Categories
                      </li>
                    </Link>
                    <Link
                      to="/selectSoftwares"
                      onClick={() =>
                        setOpen(
                          false,
                          document.body.classList.remove("scrollHide")
                        )
                      }
                    >
                      <li>
                        <RateReviewOutlinedIcon className="menuIcon" />
                        Write a Review
                      </li>
                    </Link>
                  </ul>
                </>
              )}
            </div>

            {user ? (
              <div className="bottom">
                <ul>
                  <hr />
                  <Link to="/" onClick={handleLogout}>
                    <li style={{ color: "red" }}>
                      <LogoutOutlinedIcon className="logout" />
                      Logout
                    </li>
                  </Link>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespNavbar;
