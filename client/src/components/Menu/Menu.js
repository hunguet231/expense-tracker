import { Avatar, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import "./Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  const [anchorUser, setAnchorUser] = useState(null);

  // menu
  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorUser(null);
  };
  return (
    <div className="menu-wrapper">
      <div className="menu-inner">
        <div className="menu-left">
          <div className="logo">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" />
              <p>ETracker</p>
            </Link>
          </div>
          <div className="search-box">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Tìm kiếm thứ gì đó..." />
          </div>
        </div>
        <div className="menu-right">
          <ul className="menu-option">
            <li>
              <IconButton size="small">
                <InfoOutlinedIcon />
              </IconButton>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li>
              <IconButton size="small">
                <CreditCardOutlinedIcon />
              </IconButton>
              <Link to="/dashboard">Chi tiêu</Link>
            </li>
            <li>
              <IconButton size="small">
                <AppsOutlinedIcon />
              </IconButton>
              <Link to="/ultils">Tiện ích</Link>
            </li>
            <li>
              <IconButton size="small">
                <NotificationsOutlinedIcon />
              </IconButton>
              <Link to="/notification">Thông báo</Link>
            </li>
          </ul>
          <div className="user-info" onClick={handleClickUser}>
            <Avatar />
            {/* <p className="user-name">Hung</p>
            <ArrowDropDownOutlinedIcon />
            <Menu
              anchorEl={anchorUser}
              keepMounted
              open={Boolean(anchorUser)}
              onClose={handleCloseUser}
            >
              <MenuItem>
                <div className="user-inner"></div>
              </MenuItem>
            </Menu> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
