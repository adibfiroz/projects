import React from "react";
import "./skeleton.css";

export default function Skeleton({ type }) {
  const COUNTER = 4;
  const COUNTERT = 8;
  const PopularSkeleton = () => (
    <div className="postSk">
      <div className="postSkImg"></div>
      <div className="postSkInfo">
        <div className="postSkDetail">
          <div className="postSkText"></div>
          <div className="postSkText sm"></div>
        </div>
      </div>
    </div>
  );

  const TrendSkeleton = () => <div className="trendSk"></div>;

  const CatSkeleton = () => <div className="catSk"></div>;

  const ListSkeleton = () => (
    <div className="listSk">
      <div className="listTopSk">
        <div className="leftSk"></div>
        <div className="rightSk">
          <div className="titleSk"></div>
          <div className="rateSk"></div>
        </div>
      </div>
      <div className="aboutSk"></div>
    </div>
  );

  if (type === "popularCard") return Array(COUNTER).fill(<PopularSkeleton />);
  if (type === "TrendList") return Array(COUNTERT).fill(<TrendSkeleton />);
  if (type === "catList") return Array(COUNTERT).fill(<CatSkeleton />);
  if (type === "listingCard") return Array(COUNTER).fill(<ListSkeleton />);
}
