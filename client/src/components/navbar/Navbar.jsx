import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <span className="logo">ReactBooking</span>
        </Link>
        {user ? (
          <div>
            <span>{user.username}</span>
            <button className="logout" onClick={handleLogout}>
              {user && "Logout"}
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
