const router = require("express").Router();
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username });
    !user && res.status(401).json("Incorrect username or password");

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return res.status(400).json("Incorrect  or password");
    }

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
    // const { password, ...others } = user;
    res.status(200).json({ user, accessToken });
  } catch (error) {}
});
module.exports = router;
