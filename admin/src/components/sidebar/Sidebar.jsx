import "./sidebar.scss";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CategoryIcon from "@mui/icons-material/Category";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">Bluwberry Admin</span>
        </Link>
      </div>
      <ul>
        <div className="title">User Managements</div>
        <Link to="/users">
          <li>
            <PersonIcon className="Icon" />
            Users
          </li>
        </Link>
        <div className="title">Softwares Managements</div>
        <Link to="/software">
          <li>
            <StoreMallDirectoryIcon className="Icon" />
            Softwares
          </li>
        </Link>
        <Link to="/software/new">
          <li>
            <AddBusinessIcon className="Icon" />
            Add new Software
          </li>
        </Link>
        <div className="title">Category Managements</div>
        <Link to="/categories">
          <li>
            <CategoryIcon className="Icon" />
            Category
          </li>
        </Link>
        <Link to="/categories/new">
          <li>
            <CategoryIcon className="Icon" />
            Add new Category
          </li>
        </Link>
        <div className="title">Reviews Managements</div>
        <Link to="/reviews">
          <li>
            <ReviewsRoundedIcon className="Icon" />
            Reviews
          </li>
        </Link>
        <Link
          to="/login"
          className="Logout"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          <li>
            <LogoutIcon className="Icon" />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
