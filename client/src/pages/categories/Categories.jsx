import "./categories.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RespNavbar from "../../components/navbar/RespNavbar";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Footer from "../../components/footer/Footer";
import Skeleton from "../../components/skeleton/Skeleton";

const Categories = () => {
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/categories");

  const filterList = data.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="Categories">
      <RespNavbar />
      <div className="listBackImg">
        <div className="listContainer">
          <Navbar />
          <h1 className="listTitle">Software Categories</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <KeyboardArrowRightIcon style={{ fontSize: "20px" }} />
            <span>Categories</span>
          </div>
        </div>
      </div>

      <div className="catSearch">
        <input
          type="search"
          placeholder="Search Software"
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          <SearchOutlinedIcon className="catIconSearch" />
        </span>
      </div>

      <div className="container">
        {loading ? (
          <Skeleton type="catList" />
        ) : (
          <>
            {filterList
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <div key={category._id}>
                  <Link to={`/softwares?catName=${category.name}`}>
                    <div className="catList">
                      {category.name}
                      <KeyboardArrowRightIcon style={{ fontSize: "20px" }} />
                    </div>
                  </Link>
                </div>
              ))}
          </>
        )}
        {filterList.length === 0 && (
          <div className="notFoundCAt">No results found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
