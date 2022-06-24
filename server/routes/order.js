const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = require("express").Router();

// create
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a Orders
router.get("/find/order/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find();
    // const orders = query ? await Order.find().sort({ createdAt: -1 }).limit(5) : await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // console.log(previousMonth);

  // const order = await Order.find();
  // const userOrder = order.filter((od) => {
  //   return od.status === "approved";
  // });
  // console.log(userOrder);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
          status: "delivered",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
    // console.log(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
          status: "delivered",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const orderDelete = await Order.findById(req.params.id);
  console.log(orderDelete);

  try {
    if (
      orderDelete.status === "approved" ||
      orderDelete.status === "delivery"
    ) {
      orderDelete.products.forEach(async (product) => {
        // console.log(product);
        await updateStockOrderDelete(
          product.productId,
          product.quantity,
          product.size,
          product.color
        );
      });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Order Status -- Admin
router.put("/status/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if (order.status === "approved") {
  //   return res.status(400).json({
  //     success: false,
  //     message: "You have already delivered this order",
  //   });
  // }

  if (req.body.status === "approved") {
    order.products.forEach(async (product) => {
      await updateStock(
        product.productId,
        product.quantity,
        product.size,
        product.color
      );
    });
  }

  order.status = req.body.status;

  await order.save({ validateBeforeSave: true });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity, size, color) {
  const product = await Product.findById(id);
  // product.inventory.map((item) => {
  //   if (size === item.size && color === item.color) {
  //     item.stock -= quantity;
  //   }
  // });
  if (product.categories === "accessory") {
    product.inventory.map((item) => {
      if (color === item.color) {
        item.stock -= quantity;
      }
    });
  } else {
    product.inventory.map((item) => {
      if (size === item.size && color === item.color) {
        item.stock -= quantity;
      }
    });
  }
  await product.save({ validateBeforeSave: false });
}

async function updateStockOrderDelete(id, quantity, size, color) {
  const product = await Product.findById(id);

  if (product.categories === "accessory") {
    product.inventory.map((item) => {
      if (color === item.color) {
        item.stock += quantity;
      }
    });
  } else {
    product.inventory.map((item) => {
      if (size === item.size && color === item.color) {
        item.stock += quantity;
      }
    });
  }
  await product.save({ validateBeforeSave: false });
}

module.exports = router;
