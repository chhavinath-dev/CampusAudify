const express = require("express");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var JWT_SECRET = "chhavinathkaapp";
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
//Route 1: Authetication for create a user POST 'http://localhost:5000/api/auth/createUser'
router.post(
  "/createUser",
  [body("name").isLength({ min: 3 }), body("email").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "User with email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPas = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      console.log(user.id);
      let { name } = user;
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ name, success, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success, errors: "Internal Server Error" });
    }
  }
);

//Route 2: Authetication for create a user POST 'http://localhost:5000/api/auth/login'
router.post(
  "/login",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const success = false;
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        const success = false;
        return res.status(400).json({
          success: success,
          errors: "Please try to login with correct credentials",
        });
      }
      const passwordCompr = await bcrypt.compare(password, user.password);
      if (!passwordCompr) {
        const success = false;
        return res.status(400).json({
          success: success,
          errors: "Please try to login with correct credentials",
        });
      }
      let { name } = user;
      const data = {
        user: {
          id: user.id,
        },
      };
      const success = true;
      var token = jwt.sign(data, JWT_SECRET);

      res.json({ name, success, token });
    } catch (error) {
      console.error(error.message);
      const success = false;
      res
        .status(500)
        .json({ success: success, errors: "Internal Server Error" });
    }
  }
);
//Route 3: Authetication for create a user POST 'http://localhost:5000/api/auth/getUser'. login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

module.exports = router;
