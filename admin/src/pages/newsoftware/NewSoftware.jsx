import "../new/new.scss";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import upload from "../../upload";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewSoftware = ({ inputs, title }) => {
  const [file, setFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [catName, setCatName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { data } = useFetch("/categories");

  const handleChange = (e) => {
    setInfo((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSelect = (e) => {
    setCatName(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sofwareLogo = await upload(file);

      const photos = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      const newSoftware = {
        ...info,
        catName,
        sofwareLogo,
        photos,
      };

      await axios.post("/software", newSoftware);
      setLoading(false);
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <label htmlFor="file" style={{ marginBottom: "20px" }}>
              Upload Logo:
              <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <img
              src={
                files[0]
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <label htmlFor="files">
              Upload Photos:
              <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="files"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>popular</label>
                <select id="popular" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="formInput">
                <label>Select Category</label>
                <select id="catName" onChange={handleSelect}>
                  <option value="">Select Category</option>
                  {data.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button disabled={loading} onClick={handleClick}>
                {loading ? (
                  <img alt="" src="/loading.gif" width="50" height="50" />
                ) : (
                  "Send"
                )}
              </Button>
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
              Software Added!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>
  );
};

export default NewSoftware;
