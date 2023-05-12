import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">ADIB BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpaperaccess.com/full/43870.jpg"
        alt=""
      />
    </div>
  );
}
