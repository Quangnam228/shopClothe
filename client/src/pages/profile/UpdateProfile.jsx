import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useLocation } from "react-router-dom";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  let navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  // const [users, setUserFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user.user.img
      ? user.user.img
      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
  );

  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setFile(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            _id: userId,
            ...inputs,
            img: downloadURL,
          };
          // setUserFile(user);
          updateUser(userId, user, dispatch);
        });
      }
    );
    navigate("/account");
  };

  return (
    <div className="updateProfile">
      <Navbar />
      <div className="userUpdate">
        {/* <span className="userUpdateTitle">Edit</span> */}
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              // onSubmit={handleClick}
            >
              <div className="updateProfileName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder={`ex: ${user.user.username}...`}
                  required
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder={`ex: ${user.user.email}...`}
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  // onChange={(e) => setFile(e.target.files[0])}
                  onChange={updateProfileDataChange}
                />
              </div>
              {/* <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              /> */}
              <button className="updateProfileBtn" onClick={handleClick}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
