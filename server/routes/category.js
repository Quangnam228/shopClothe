const Category = require("../models/Category");

const router = require("express").Router();

// get all
router.get("/", async (req, res) => {
  try {
    const cates = await Category.find();
    res.status(200).json(cates);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
