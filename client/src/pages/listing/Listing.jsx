import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import RespNavbar from "../../components/navbar/RespNavbar";
import "./listing.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListingCard from "../../components/listingcard/ListingCard";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import ArticleCard from "../../components/articlecard/ArticleCard";
import Footer from "../../components/footer/Footer";
import GoToTop from "../../components/gototop/GoToTop";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/skeleton/Skeleton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = ["5 Star", "4 Star", "3 Star", "Less than 3 Star"];

const Listing = () => {
  const [personName, setPersonName] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [sort, setSort] = useState("price");
  const [populart, setPopular] = useState("");
  const { search } = useLocation();

  const catName = window.location.search.substring(9).replace(/%20/g, " ");

  const { data, loading, error, reFetch } = useFetch(
    `/software${search}&sort=${sort}&popular=${populart}`
  );

  const handleSelect = (event) => {
    setAge(event.target.value);
  };

  const reSort = (type) => {
    setSort(type);
  };

  const popular = (type) => {
    setPopular(true);
  };

  useEffect(() => {
    reFetch();
    // eslint-disable-next-line
  }, [sort, populart]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="listing">
      <RespNavbar />
      <div className="listBackImg">
        <div className="listContainer">
          <Navbar />
          <h1 className="listTitle">{catName}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <KeyboardArrowRightIcon style={{ fontSize: "20px" }} />
            <span>{catName}</span>
          </div>
        </div>
      </div>

      <div className="sorting">
        <div className="container">
          <div className="sortFlex">
            <div className="lSort">
              <FormControl className="sortSelect">
                <InputLabel id="demo-multiple-chip-label" className="labelText">
                  User Ratings
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  disabled
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="rSort">
              <FormControl className="sortSelect">
                <Select value={age} onChange={handleSelect} displayEmpty>
                  <MenuItem onClick={() => reSort("price")} value="">
                    Most Reviewd
                  </MenuItem>
                  <MenuItem onClick={popular} value={true}>
                    Popular
                  </MenuItem>
                  <MenuItem onClick={() => reSort("createdAt")} value={20}>
                    Newest
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="softwareList">
        <div className="container">
          <div className="listFlex">
            <div className="lCard">
              {loading ? (
                <Skeleton type="listingCard" />
              ) : error ? (
                "something went wrong!"
              ) : (
                data.map((listSoftware) => (
                  <ListingCard key={listSoftware._id} item={listSoftware} />
                ))
              )}
              <div className="pagination">
                <Pagination count={6} color="primary" />
              </div>
            </div>
            <div className="sidebar">
              <div className="buisness">
                <img alt="business" src="/buisness.png" />
                <div className="txtBlue">Is this your business?</div>
                <p>
                  Respond to reviews and customer messages. Claiming is free,
                  and only takes a minute.
                </p>
                <Button className="claimButton">CLAIM YOUR LISTING</Button>
              </div>
              <div className="whyBB">
                <div className="txtBlue">Why trust Bluwberry?</div>
                <p>
                  Bluwberry is the best software-finding platform that offers
                  entrepreneurs, stakeholders, and businesses with the latest
                  trends in the tech network. Our team is working round the
                  clock to provide candid, unbiased scores to all the products
                  listed on our page. We're also a free-forever solution that
                  caters to multifarious industries across the globe, including
                  yours. Ready to find your perfect software? Join us today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="topArticle">
        <h3 style={{ textAlign: "left" }}>Top Recommended Articles</h3>
        <div className="article">
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

export default Listing;
