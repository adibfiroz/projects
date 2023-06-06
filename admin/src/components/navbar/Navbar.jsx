import "./navbar.scss";
import LanguageIcon from "@mui/icons-material/Language";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="Lnav">
        <span>Home</span>
      </div>
      <div className="Mnav">
        <span>Administrator: Bluwberry</span>
      </div>
      <div className="Rnav">
        <LanguageIcon />
        English
      </div>
    </div>
  );
};

export default Navbar;
