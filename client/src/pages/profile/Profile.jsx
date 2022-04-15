import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./profile.css";
import Navbar from "../../components/Navbar";

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser.user);
  console.log(user);
  return (
    <div className="profile">
      <Navbar />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img
            src={
              user.img
                ? user.img
                : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            }
            alt={user.name}
          />
          <Link to={"/users/update/" + user._id}>Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.username}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/myOrder/">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
