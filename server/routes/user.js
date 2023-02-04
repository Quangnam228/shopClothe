const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { route } = require("./auth");

const router = require("express").Router();

// create

router.post("/", async (req, res) => {
  const newUser = new Product(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update profile

router.put("/update/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = await argon2.hash(req.body.password);
  }

  try {
    updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const accessToken = jwt.sign(
      {
        id: updateUser._id,
        isAdmin: updateUser.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).json({
      updateUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update password

router.put(
  "/update/password/:id",
  // verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      user = await User.findById(req.params.id);

      const passwordValid = await argon2.verify(
        user.password,
        req.body.password
      );

      if (!passwordValid) {
        return res.status(400).json("Incorrect  or password");
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json("Password don't match");
      }

      const hashedPassword = await argon2.hash(req.body.newPassword);

      user.password = hashedPassword;

      await user.save();
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {
          expiresIn: "3d",
        }
      );
      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
// Delete men
router.put("/trash/:id", async (req, res) => {
  try {
    // await User.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.params.id);
    user.trash = true;
    user.save();
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

//get all user
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({ trash: false }).sort({ _id: -1 }).limit(5)
      : await User.find({ trash: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user
router.get("/allUser", async (req, res) => {
  try {
    const users = await User.find({ trash: false });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user stats

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
