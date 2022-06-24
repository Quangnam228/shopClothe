import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useState, useEffect } from "react";
import { addUser } from "../../redux/apiCallsAdmin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewUserAdmin() {
  const [inputs, setInputs] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeIsAdmin = (e) => {
    setIsAdmin(e.target.value);
  };
  const user = {
    // ...inputs,
    email,
    username,
    password,
    confirmPassword,
    isAdmin,
  };

  const handleClick = (e) => {
    e.preventDefault();

    const filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (
      user?.password === "" ||
      user?.email === "" ||
      user?.username === "" ||
      user?.confirmPassword === ""
    ) {
      toast.warning("You need to enter all the information");
    } else if (!filter.test(user?.email)) {
      toast.warning("Please enter a valid email address.\nExample@gmail.com");
      return;
    } else if (user.password.length < 8) {
      toast.warning("length password must be between 8");
      return;
    } else if (user.password !== user.confirmPassword) {
      toast.warning("password don't match");
      return;
    } else {
      addUser(user, dispatch);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin("");
    }
  };

  console.log(user);

  return (
    <div className="newUser">
      <div className="newUserContainer">
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input
              name="username"
              value={username}
              type="text"
              placeholder="john"
              onChange={handleChangeUsername}
            />
          </div>

          <div className="newUserItem">
            <label>Email</label>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="john@gmail.com"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              name="password"
              value={password}
              type="password"
              placeholder="password"
              onChange={handleChangePassword}
            />
          </div>
          <div className="newUserItem">
            <label>confirmPassword</label>
            <input
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="password"
              onChange={handleChangeConfirmPassword}
            />
          </div>
          <div className="newUserItem">
            <label>Admin</label>
            <select
              className="newUserSelect"
              value={isAdmin}
              name="isAdmin"
              id="isAdmin"
              onChange={handleChangeIsAdmin}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button className="newUserButton" onClick={handleClick}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
