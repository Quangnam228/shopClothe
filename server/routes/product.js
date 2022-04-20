const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const router = require("express").Router();

// create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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

//get all Product
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  // console.log(req.query);
  const queryCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
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

// create or update review
router.put("/review/item", async (req, res) => {
  const { rating, comment, productId, userId } = req.body;
  const userReview = await User.findById(userId);
  const order = await Order.find();
  const product = await Product.findById(productId);

  const userOrder = order.filter((od) => {
    return od.userId === userId && od.status === "approved";
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
