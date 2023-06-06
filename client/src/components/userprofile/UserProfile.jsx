import React, { useContext, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import upload from "../../upload";
import newRequest from "../../config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserProfile = () => {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const uploadPic = async (e) => {
      dispatch({ type: "UPDATE_START" });
      if (file) {
        const profilePic = await upload(file);
        const updatedUser = {
          userId: user.id,
          profilePic,
        };
        try {
          const res = await newRequest.put("/users/" + user._id, updatedUser);
          setOpen(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      }
    };
    uploadPic();
  }, [file, dispatch, user._id, user.id]);

  return (
    <div className="userProfile">
      <div className="listBackImg">
        <div className="listContainer">
          <Navbar />
          <div className="container">
            <h1 className="listTitle">{user.username}</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <KeyboardArrowRightIcon style={{ fontSize: "20px" }} />
              <span>{user.username} 's</span>
            </div>
            <div className="userImage">
              <img
                src={
                  user.profilePic
                    ? file
                      ? URL.createObjectURL(file)
                      : user.profilePic
                    : "/userDefault.jpg"
                }
                alt=""
              />
              <label className="photoposi" htmlFor="uploadphoto">
                <AddAPhotoIcon className="addphoto" />
              </label>
              <input
                type="file"
                hidden
                id="uploadphoto"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your Profile Pic Has Been Updated!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default UserProfile;
