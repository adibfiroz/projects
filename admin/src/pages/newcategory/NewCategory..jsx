import "../new/new.scss";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewCategory = ({ title }) => {
  const [trending, setTrend] = useState(Boolean);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      trending,
    };
    try {
      await axios.post("/categories", newCategory);
      setName("");
      setOpen(true);
    } catch (err) {}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Add Category</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Add new category"
                />
              </div>

              <div className="formInput">
                <label>Trending</label>
                <select
                  id="trending"
                  onChange={(e) => setTrend(e.target.value)}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleCategory}>Send</button>
            </form>
          </div>
        </div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Category Added!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>
  );
};

export default NewCategory;
