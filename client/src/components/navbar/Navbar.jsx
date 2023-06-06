import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  const [addClass, setAddClass] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState("");
  const { data, loading } = useFetch("/software");
  const navigate = useNavigate();

  const onSearch = (e) => {
    setShowSearch(e.target.value);
  };

  const filterList = data.filter((search) =>
    search.name.toLowerCase().includes(showSearch.toLowerCase())
  );

  const checkScrollTop = () => {
    if (!addClass && window.pageYOffset > 300) {
      setAddClass(true);
    } else if (addClass && window.pageYOffset <= 300) {
      setAddClass(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  const handleWrite = () => {
    if (user) {
      navigate("/selectSoftwares");
    } else {
      navigate("/login");
    }
  };

  const handleClear = (e) => {
    setShowSearch("");
  };

  return (
    <div className="navbar">
      <div className={`deskNavbar${addClass ? " isSticky" : ""}`}>
        <div className="navContainer">
          <div className="Lcontents">
            <Link to="/">
              <span className="logo">Bluwberry</span>
            </Link>
            <Link to="/categories">
              <span className="headText">Software Categories</span>
            </Link>
          </div>
          <div className="navSearch">
            <input
              type="text"
              onChange={onSearch}
              placeholder="Search Softwares"
              name="Search"
              value={showSearch}
            />
            <span>
              <SearchOutlinedIcon className="naviconSearch" />
            </span>
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
          {user ? (
            <div className="Rcontents">
              <NotificationsActiveRoundedIcon className="bellIcon" />
              <div className="userprofile">
                <img
                  src={user?.profilePic || "/userDefault.jpg"}
                  alt="userImg"
                />
                <div className="userDropDown">
                  <Link to={`/profile/?user=${user.username}`}>
                    {user.username}
                  </Link>
                  <Link
                    to="/"
                    onClick={() => dispatch({ type: "LOGOUT" })}
                    className="Logout"
                  >
                    Logout
                  </Link>
                </div>
              </div>
              <Link to="/selectSoftwares">
                <Button className="writeText">Write a Review</Button>
              </Link>
            </div>
          ) : (
            <div className="Rcontents">
              <Link to="/login">
                <span className="headText">Login In / Sign Up</span>
              </Link>
              <Link
                to="/selectSoftwares"
                onClick={handleWrite}
                className="writeText"
              >
                Write a Review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
