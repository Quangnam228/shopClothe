import { MailOutline, Publish } from "@material-ui/icons";
import "./user.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCallsAdmin";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserAdmin() {
  const [inputs, setInputs] = useState({});
  // const [password, setPassword] = useState();
  // const [isAdmin, setIsAdmin] = useState();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const user = useSelector((state) =>
    state.usersAdmin.users.find((user) => user._id === userId)
  );
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [avatarPreview, setAvatarPreview] = useState(
    user.img
      ? user.img
      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
  );

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
    let imageUpdate = avatarPreview;
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      if (inputs.password === "" || inputs.isAdmin === "") {
        toast.warning("You have not entered all the information");
        return;
      }
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
            const userUpdate = {
              _id: userId,
              ...inputs,
              username: user.username,
              email: user.email,
              img: downloadURL,
            };
            updateUser(userId, userUpdate, dispatch);
          });
        }
      );
    } else {
      const userUpdate = {
        _id: userId,
        ...inputs,
        username: user.username,
        email: user.email,
        img: imageUpdate,
      };
      updateUser(userId, userUpdate, dispatch);
    }
  };

  return (
    <div className="user">
      <h1 className="userTitle">Edit User</h1>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img
                  ? user.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={user.username}
                  name="username"
                  disabled
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={user.email}
                  name="email"
                  className="userUpdateInput"
                  disabled
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select
                  id="isAdmin"
                  name="isAdmin"
                  className="userUpdateInput"
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={updateProfileDataChange}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
