import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const ReviwedCat = ({ revCat }) => {
  const { data } = useFetch(`/software/find/${revCat.softId}`);

  return <Link to={`/softwares?catName=${data.catName}`}>{data?.catName}</Link>;
};

export default ReviwedCat;
