import {
  AccountCircle,
  AccountCircleOutlined,
  Add,
  AddOutlined,
  Home,
  HomeOutlined,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [tap, setTap] = useState(window.location.pathname);
  return (
    <div className="header fixedTop">
      <Link to="/" onClick={() => setTap("/")}>
        {tap === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTap("/newpost")}>
        {tap === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      <Link to="/search" onClick={() => setTap("/search")}>
        {tap === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTap("/account")}>
        {tap === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;
