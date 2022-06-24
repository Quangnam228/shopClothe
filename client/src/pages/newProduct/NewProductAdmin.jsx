import "./newProduct.css";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCallsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewProductAdmin() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.productAdmin);
  console.log(error);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategory = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleStock = (e) => {
    setStock(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const inventory = [];

    if (
      file === null ||
      cat.length < 1 ||
      color.length < 1 ||
      // size.length < 1 ||
      stock.length < 1 ||
      inputs.title === "" ||
      inputs.decs === ""
    ) {
      toast.warning("You need to enter all the information");
      return;
    }
    let booleanCategory = false;
    cat.forEach((category) => {
      if (category === "accessory") {
        return (booleanCategory = true);
      }
    });

    if (!booleanCategory) {
      if (color.length !== stock.length || color.length !== size.length) {
        toast.warning(
          "the length of the fields in the inventory must be equal"
        );
        return;
      } else {
        for (let i = 0; i < color.length; i++) {
          inventory.push({
            color: color[i],
            size: size[i],
            stock: parseInt(stock[i]),
          });
        }
      }
    } else {
      if (color.length !== stock.length) {
        toast.warning(
          "the length of the fields in the inventory must be equal"
        );
        return;
      } else {
        for (let i = 0; i < color.length; i++) {
          inventory.push({
            color: color[i],
            // size: size[i],
            stock: parseInt(stock[i]),
          });
        }
      }
    }

    const fileName = new Date().getTime() + file?.name;
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
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            image: downloadURL,
            categories: cat,
            inventory: inventory,
          };
          console.log(product);
          addProduct(product, dispatch);
          if (!error) {
            navigate("/admin/products");
          }
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductContainer1">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title......"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="Description..."
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Category</label>
              <input
                type="text"
                placeholder="Category..."
                onChange={handleCategory}
              />
            </div>
          </div>
          <div className="addProductContainer2">
            <div className="addProductItem">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="Price..."
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Inventory</label>
              <div className="inventoryProduct">
                <div className="inventoryProductItem">
                  <input
                    name="color"
                    type="text"
                    placeholder="Color... ex: yellow,black"
                    onChange={handleColor}
                  />
                </div>
                <div className="inventoryProductItem">
                  <input
                    name="size"
                    type="text"
                    placeholder="Size... ex: S,M,L"
                    onChange={handleSize}
                  />
                </div>
                <div className="inventoryProductItem">
                  <input
                    name="stock"
                    type="text"
                    placeholder="Stock... ex: 12,15,123"
                    onChange={handleStock}
                  />
                </div>
              </div>
            </div>
            <button className="addProductButton" onClick={handleClick}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
