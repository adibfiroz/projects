import "./login.css";
import RespNavbar from "../../components/navbar/RespNavbar";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import newRequest from "../../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate(-1);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleGoogleLogin = () => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, provider).then((result) => {
      newRequest
        .post("/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          navigate(-1);
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        });
    });
  };
  return (
    <div className="login">
      <RespNavbar />
      <Navbar />

      <div className="container">
        <div style={{ textAlign: "right" }}>
          <Link to="/register">
            <Button className="registerBtn">Register</Button>
          </Link>
        </div>
        <div className="itemCenter">
          <div className="dFlex">
            <div className="loginForm">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  placeholder="Password"
                  type={isRevealPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eyeIcon"
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                >
                  {isRevealPwd ? (
                    <RemoveRedEyeOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </span>
              </div>
              <div className="fpassword">Forgot Password?</div>
              <button
                disabled={!username || !password + loading}
                className="submit"
                onClick={handleLogin}
              >
                {loading ? (
                  <img alt="" src="/loading.gif" width="50" height="50" />
                ) : (
                  "Login"
                )}
              </button>

              {error && <span className="errorLogin">{error.message}</span>}
            </div>
            <div className="Or">OR</div>
            <div className="socialLogin">
              <div className="socialBtn" onClick={handleGoogleLogin}>
                <GoogleIcon />
                Login with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
