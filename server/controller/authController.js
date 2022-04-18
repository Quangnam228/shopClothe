const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class authController {
  async register(req, res) {
    try {
      const { username, password, email, img, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res.status(400).json("Password does not match");
      }

      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        img: img,
      });
      const user = await newUser.save();

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

      res.status(201).json({ user, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async login(req, res) {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
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
  }
}
module.exports = new authController();
