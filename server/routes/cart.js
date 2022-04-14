const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Cart = require("../models/Cart");

const router = require("express").Router();

const cartController = require("../controller/cartController");
// create

router.post("/", verifyToken, cartController.create);

//Update
router.put("/:id", verifyTokenAndAuthorization, cartController.update);

// Delete
router.delete("/:id", verifyTokenAndAuthorization, cartController.delete);

// get user Cart
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  cartController.getUserCart
);
// get all
router.get("/", verifyTokenAndAdmin, cartController.getAll);
module.exports = router;
