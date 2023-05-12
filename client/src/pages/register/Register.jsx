import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      dispatch({ type: "USER_EXIST", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div>
        <form className="lContainer" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="lInput"
          />
          <button disabled={loading} type="submit" className="lButton">
            Register
          </button>
        </form>

        {error && <span className="errmsg">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
