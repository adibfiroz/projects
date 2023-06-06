import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import UserProfile from "../../components/userprofile/UserProfile";
import RespNavbar from "../../components/navbar/RespNavbar";
import { AuthContext } from "../../context/AuthContext";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import newRequest from "../../config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProfile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState("");
  const [linkIn, setLinkIn] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleEditUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "UPDATE_START" });
    const updateUser = {
      userId: user._id,
      username,
      email,
      mobile,
      linkIn,
      city,
      country,
      zipcode,
      address,
    };

    try {
      const res = await newRequest.put("/users/" + user._id, updateUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setOpen(true);
      setLoading(false);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="EditProfile">
      <RespNavbar />
      <UserProfile />
      <div className="profileHeader">
        <div className="container dFlex">
          <Link to="/profile">
            <div className="navLinks">Reviews</div>
          </Link>
          <Link to="/edit-profile">
            <div className="navLinks active">Edit Profile</div>
          </Link>
          <Link to="/software-saved">
            <div className="navLinks">Software Saved</div>
          </Link>
          <div className="navLinks">Logout</div>
        </div>
      </div>

      <div className="editForm">
        <div className="container">
          <div className="dFlex">
            <div className="lEditUser">
              <img src={user.profilePic || "/userDefault.jpg"} alt="naruto" />
              <div className="userName">{user.username}</div>
              <div className="address">{user.city}</div>
            </div>
            <div className="rEdit">
              <h2>Edit Profile</h2>
              <form onSubmit={handleEditUpdate}>
                <div className="dFlex">
                  <input
                    type="text"
                    className="editInputs"
                    placeholder={user.username}
                    value={user.username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="email"
                    className="editInputs"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user.email}
                    value={user.email}
                  />
                </div>
                <div className="dFlex">
                  <input
                    type="number"
                    maxLength="10"
                    className="editInputs"
                    placeholder={user.mobile || "mobile"}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <input
                    type="text"
                    className="editInputs"
                    placeholder={user.linkIn || "linkedIn"}
                    onChange={(e) => setLinkIn(e.target.value)}
                  />
                </div>
                <div className="dFlex">
                  <input
                    type="text"
                    className="editInputs flex3"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={user.city || "city"}
                  />
                  <input
                    type="text"
                    className="editInputs flex3"
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={user.country || "country"}
                  />
                  <input
                    type="number"
                    className="editInputs flex3"
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder={user.zipcode || "zipcode"}
                  />
                </div>
                <div className="dFlex">
                  <input
                    type="text"
                    className="editInputs"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={user.address || "address"}
                  />
                </div>
                <button disabled={loading} className="updateBtn">
                  {loading ? (
                    <img alt="" src="/loading.gif" width="50" height="50" />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your Profile Has Been Updated!
          </Alert>
        </Snackbar>
      </Stack>
      <Footer />
    </div>
  );
};

export default EditProfile;
