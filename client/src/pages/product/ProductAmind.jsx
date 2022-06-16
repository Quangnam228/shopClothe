import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

import { updateProduct } from "../../redux/apiCallsAdmin";

export default function ProductAdmin() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const [pStats, setPStats] = useState([]);
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const product = useSelector((state) =>
    state.productAdmin.products.find((product) => product._id === productId)
  );
  console.log(productId);
  console.log(product);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

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

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            _id: productId,
            ...inputs,
            image: downloadURL,
            categories: cat,
            color,
            size,
          };
          updateProduct(productId, product, dispatch);
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.image} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">name:</span>
              <span className="productInfoValue">{product?.title}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product?.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product?.title}
              name="title"
              onChange={handleChange}
            />
            <label>Product Desc</label>
            <input
              type="text"
              placeholder={product?.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Product price</label>
            <input
              type="text"
              placeholder={product?.price}
              onChange={handleChange}
            />
            <label>Product Color</label>
            <input
              type="text"
              placeholder={product?.color}
              onChange={handleColor}
            />
            <label>Product Size</label>
            <input
              type="text"
              placeholder={product?.size}
              onChange={handleSize}
            />
            <label>Product categories</label>
            <input
              type="text"
              placeholder={product?.categories}
              onChange={handleCategory}
            />
            <label>In Stock</label>
            {/* <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select> */}
            <input
              type="number"
              name="inStock"
              id="idStock"
              placeholder={product?.inStock}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.image} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
