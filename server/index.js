const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const connextDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopClothes", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connect success");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connextDB();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Running Backend");
});
