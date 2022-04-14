const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Product = require("../models/Product");

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
  // const filters = req.query;
  // const filteredUsers = Product.filter(item => {
  //   let isValid = true;
  //   for (key in filters) {
  //     isValid = isValid && item[key] == filters[key];
  //   }
  //   return isValid;
  // });
  // res.send(filteredUsers);
  const searchTitle = req.query.title;

  // Product.find({ title: { $regex: searchTitle, $options: "$i" } }).then(
  //   (data) => {
  //     res.send(data);
  //   }
  // );
  let data = await Product.find({
    title: { $regex: new RegExp("^" + searchTitle + ".*", "i") },
  }).exec();
  data = data.slice(0, 10);
  res.send(data);
});
module.exports = router;
