import "./savedsoftware.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Rating from "@mui/material/Rating";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import newRequest from "../../config";
const SavedSoftware = ({ saveSoft }) => {
  const { data, reFetch, loading } = useFetch(`/users/software/${saveSoft}`);
  const { user, dispatch } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      await newRequest.put(`/users/remove/${id}`, {
        userId: user._id,
      });
      dispatch({ type: "REMOVE", payload: id });
      reFetch();
    } catch (err) {}
  };

  return (
    <div>
      <h2>
        Software Saved{" "}
        <span style={{ color: "#1859B4" }}> ({data.length})</span>
      </h2>
      {data.length ? (
        loading ? (
          "loading"
        ) : (
          data.map((softList) => (
            <div className="savedsoftware" key={softList._id}>
              <div className="dFlex">
                <DeleteForeverRoundedIcon
                  onClick={() => handleDelete(softList._id)}
                  className="delete"
                />
                <div className="lsoftImg">
                  <img
                    alt="defaultSoft"
                    src={softList?.sofwareLogo || "/defaultSoftware.png"}
                  />
                </div>
                <div className="softDeatials">
                  <Link to={`/${softList.name}-${softList._id}`}>
                    <div className="softTitle">{softList.name}</div>
                  </Link>
                  <div className="stars">
                    <Rating
                      name="read-only"
                      size="large"
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      emptyIcon={
                        <StarRoundedIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      value={Math.round(
                        softList.totalStars / softList.starNumber
                      )}
                      readOnly
                    />
                    <div className="reviewCount">
                      {softList.starNumber} Reviews
                    </div>
                  </div>
                </div>
              </div>

              <div className="profileRevDesc">
                {softList.whatIs}
                <span style={{ color: "#1859B4", fontWeight: "bold" }}>
                  ...Read More
                </span>
              </div>
            </div>
          ))
        )
      ) : (
        <p className="notSave">You havn't Saved any Softwares.</p>
      )}
    </div>
  );
};

export default SavedSoftware;
