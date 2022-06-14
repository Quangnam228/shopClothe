import React from "react";
import "./topbar.css";
// import {
//   NotificationsNone, Language, Settings,
// } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    // dispatch(resetUser());
  };
  console.log(user);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">.NN</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <div className="navbarUser">
            <img
              src={
                user.user?.img
                  ? user.user?.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="topAvatar"
            />
            <ul className="navbarUserMenu">
              <li className="navbarUserMenuItem">
                <a href="/account">Profile</a>
              </li>
              <li className="navbarUserMenuItem">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
