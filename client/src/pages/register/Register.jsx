import Navbar from "../../components/navbar/Navbar";
import RespNavbar from "../../components/navbar/RespNavbar";
import "./register.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import FormInput from "./FormInput";
import newRequest from "../../config";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    setLoading(true);
    try {
      const res = await newRequest.post("/auth/register", {
        ...values,
      });
      res.data && window.location.replace("/");
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="register">
      <RespNavbar />
      <Navbar />
      <div className="container">
        <div style={{ textAlign: "right" }}>
          <Link to="/login">
            <Button className="loginBtn">Login</Button>
          </Link>
        </div>

        <div className="itemCenter">
          <div className="dFlex">
            <form className="loginForm" onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <button
                className="submit"
                disabled={
                  !values.username ||
                  !values.password ||
                  !values.email + loading
                }
              >
                {loading ? (
                  <img alt="" src="/loading.gif" width="40" height="40" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
        {error && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            Something went wrong!
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
