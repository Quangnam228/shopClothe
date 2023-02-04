const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const ApiFeatures = require("../utils/apifeatures");
const router = require("express").Router();

// create

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.put("/trash/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    product.trash = true;
    product.save();
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Product admin
router.get("/admin/", async (req, res) => {
  try {
    const products = await Product.find({ trash: false });

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all products again
router.get("/get/filter", async (req, res) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find({ trash: false }), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// search product
router.get("/search", async (req, res) => {
  const searchTitle = req.query.title;

  let data = await Product.find({
    title: { $regex: new RegExp("^" + searchTitle + ".*", "i") },
  }).exec();
  data = data.slice(0, 10);
  res.send(data);
});

router.get("/", async (req, res) => {
  const productsCount = await Product.countDocuments();
  const perPage = 10;
  const page = Number(req.query.page) || 1;
  const queryCategory = req.query.category;
  const querySize = req.query.size;
  const queryColor = req.query.color;
  const queryKeyword = req.query.keyword;

  const queryCopy = { ...req.query };
  const removeFields = [
    "keyword",
    "page",
    "limit",
    "category",
    "size",
    "color",
  ];

  removeFields.forEach((key) => delete queryCopy[key]);

  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  let pros = JSON.parse(queryStr);

  const dataSearch = await Product.find({
    title: { $regex: new RegExp("^" + queryKeyword + ".*", "i") },
  });

  console.log(dataSearch);
  try {
    const products = await Product.find({
      // title: { $regex: new RegExp("^" + queryKeyword + ".*", "i") },
      // categories: { $in: [queryCategory] },
      // color: { $in: [queryColor] },
      // size: { $in: [querySize] },
      // price: pros.price,
      // ratings: pros.rating,
    })
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    const filteredProductsCount = products.length;
    res.status(200).json({
      products,
      productsCount,
      perPage,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// create or update review
router.put("/review/item", async (req, res) => {
  const { rating, comment, productId, userId } = req.body;

  const userReview = await User.findById(userId);
  const product = await Product.findById(productId);
  const order = await Order.find();

  const userOrder = order.filter((od) => {
    return od.userId === userId && od.status === "delivered";
  });

  let isReviewBought = false;
  userOrder.map((userOd) => {
    userOd.products.map((prd) => {
      if (prd.productId.toString() === productId.toString()) {
        isReviewBought = true;
      }
    });
  });

  if (isReviewBought) {
    const review = {
      user: userReview._id,
      name: userReview.username,
      rating: Number(rating),
      comment,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === userReview._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === userReview._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "You have not purchased this product yet",
    });
  }
});

router.get("/reviews", async (req, res) => {
  const product = await Product.findById(req.query.id);

  !product && res.status(404).json("Product not found");

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

router.delete("/reviewDelete/review", async (req, res) => {
  const product = await Product.findById(req.query.productId);

  !product && res.status(404).json("Product not found");

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  console.log(reviews);

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
  });
});

module.exports = router;
