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

export default function NewUserAdmin() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
            ...inputs,
            img: downloadURL,
          };

          addUser(user, dispatch);
        });
      }
    );
    setInputs({});
    setFile(null);
    history.push("/users");
  };

  return (
    <div className="newUser">
      <div className="newUserContainer">
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="newUserItem">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="john"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Admin</label>
            <select
              className="newUserSelect"
              name="isAdmin"
              id="isAdmin"
              onChange={handleChange}
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
