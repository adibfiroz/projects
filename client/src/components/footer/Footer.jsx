import "./footer.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="fooTop">
          <div className="list">
            <span className="footerLogo">BB</span>
          </div>
          <div className="list middle">
            <p>UseFull Links</p>
            <ul>
              <li>
                <Link to="/categories">Software categories</Link>
              </li>
              <li>Write a Review</li>
              <li>Advertise with Us</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="list middle">
            <p>Other Links</p>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Advertise with Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="list">
            <p className="footerTitle">Share</p>
            <div className="socialIcons">
              <FacebookOutlinedIcon className="sIcons" />
              <InstagramIcon className="sIcons" />
              <TwitterIcon className="sIcons" />
            </div>
          </div>
        </div>
      </div>
      <div className="fooBottom">
        <span>
          Project By Adib Firoz Copyright © {new Date().getFullYear()}{" "}
          bluwbery.onrender.com
        </span>
      </div>
    </div>
  );
};

export default Footer;
