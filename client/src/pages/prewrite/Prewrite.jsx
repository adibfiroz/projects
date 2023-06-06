import React, { useContext, useState } from "react";
import "./prewrite.css";
import Navbar from "../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RespNavbar from "../../components/navbar/RespNavbar";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PopularCard from "../../components/popularCard/PopularCard";
import Footer from "../../components/footer/Footer";

const Prewrite = () => {
  const [showSearch, setShowSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: catData, loading: catLoad } = useFetch("/categories");
  const { data, loading } = useFetch("/software");

  const { user } = useContext(AuthContext);
  const { data: getReviews } = useFetch(`/users/reviews/${user?._id}`);
  const navigate = useNavigate();
  const { search } = useLocation();

  const { data: getPopSoftwares } = useFetch(`/software${search}`);

  const onSearch = (e) => {
    setShowSearch(e.target.value);
  };

  const catList = catData.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  const filterList = data.filter((search) =>
    search.name.toLowerCase().includes(showSearch.toLowerCase())
  );

  const handlecheckRev = (id, name) => {
    if (getReviews.find((d) => d.softId === id)) {
      alert(`You have already written review on ${name}`);
    } else {
      navigate(`/write-review/${id}`);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCatQuery = (name) => {
    setQuery("");
    navigate(`/selectSoftwares?catName=${name}`);
    setOpen(false);
  };

  return (
    <div className="prewrite">
      <Navbar />
      <RespNavbar />
      <div className="writeContainer">
        <div className="topFlex">
          <div className="lSearch">
            <h2>Write a review on software</h2>
            <div className="preSearch">
              <input
                type="search"
                onChange={onSearch}
                placeholder="Search Softwares"
                name="Search"
              />

              <SearchOutlinedIcon className="presearchicon" />
              {showSearch.length > 1 && (
                <ul>
                  {loading ? (
                    "loading"
                  ) : (
                    <>
                      {filterList.map((search) => (
                        <li key={search._id}>
                          <div
                            className="searchItem"
                            onClick={() =>
                              handlecheckRev(search._id, search.name)
                            }
                          >
                            {search.name}
                            {getReviews.find(
                              (d) => d.softId === search._id
                            ) && <span className="redTxt">You reviewed</span>}
                          </div>
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
          <div className="rImage">
            <img src="./prewrite.png" alt="dimage" />
          </div>
        </div>
      </div>

      <div className="bxshadowline"></div>
      <div className="selectCat">
        <h2>Popular Softwares Products</h2>
        <span className="selectInput">
          <input
            type="text"
            placeholder="Select Category"
            onClick={handleOpen}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {open && (
            <ul>
              <li onClick={() => setOpen(false)}>
                <Link className="catQuery" to="/selectSoftwares">
                  All
                </Link>
              </li>
              {catLoad ? (
                <li>Loading</li>
              ) : (
                <>
                  {catList.map((cats) => (
                    <li key={cats._id}>
                      <div
                        className="catQuery"
                        onClick={() => handleCatQuery(cats.name)}
                      >
                        {cats.name}
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
        </span>
      </div>

      <div className="popularList">
        <div className="popContainer">
          {getPopSoftwares.map((popSoft) => (
            <PopularCard key={popSoft._id} popSoft={popSoft} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prewrite;
