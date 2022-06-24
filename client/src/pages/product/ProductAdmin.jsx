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
import { toast } from "react-toastify";

export default function ProductAdmin() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();

  const [pStats, setPStats] = useState([]);
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const product = useSelector((state) =>
    state.productAdmin.products.find((product) => product._id === productId)
  );
  const [avatarPreview, setAvatarPreview] = useState(
    product?.image
      ? product?.image
      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
  );

  console.log(product?.inventory);
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
    let inventory = [];
    let imageUpdate = avatarPreview;

    if (
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
    product.categories.forEach((category) => {
      if (category === "accessory") {
        return (booleanCategory = true);
      }
    });
    if (!booleanCategory) {
      if (color.length !== size.length || color.length !== stock.length) {
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

    if (file !== null) {
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
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const productUpdate = {
              _id: productId,
              ...inputs,
              image: downloadURL,
              categories: cat,
              inventory: inventory,
            };
            updateProduct(productId, productUpdate, dispatch);
          });
        }
      );
    } else {
      const productUpdate = {
        _id: productId,
        ...inputs,
        image: imageUpdate,
        categories: cat,
        inventory: inventory,
      };
      updateProduct(productId, productUpdate, dispatch);
    }
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
            <label>Product categories</label>
            <input
              type="text"
              placeholder={product?.categories}
              onChange={handleCategory}
            />
            <label>Product Inventory</label>
            <label>Color</label>
            <input type="text" placeholder="" onChange={handleColor} />
            <label>Size</label>
            <input type="text" placeholder="" onChange={handleSize} />
            <label>Stock</label>
            <input type="text" placeholder="" onChange={handleStock} />
          </div>

          <div className="productFormRight">
            <div className="productUpload">
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
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
