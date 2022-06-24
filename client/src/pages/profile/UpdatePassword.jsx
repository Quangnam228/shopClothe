import React, { useState, useEffect } from "react";
import "./updatePassword.css";
// import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../redux/apiCalls";
import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const user = useSelector((state) => state.user.currentUser?.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const location = useLocation();
  // const userId = location.pathname.split("/")[3];

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log(inputs);
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const { password, newPassword, confirmPassword } = inputs;

    if (password === "" && newPassword === "" && confirmPassword === "") {
      toast.warning("You have not entered all the information");
    } else if (newPassword !== confirmPassword) {
      toast.warning("Password don't match");
    } else {
      const data = { ...inputs };
      updatePassword(user._id, data, dispatch);
    }
  };

  return (
    <div className="updatePassword">
      <Navbar />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Profile</h2>
          <form onSubmit={updatePasswordSubmit} className="updatePasswordForm">
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                name="password"
                required
                onChange={handleChange}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </div>
  );
}
