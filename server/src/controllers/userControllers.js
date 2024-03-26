const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const registerNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists." });
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;
      await User.create(req.body);
      res.status(201).json({ msg: "registered successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  try {
    const userDetail = await User.findOne({ email: req.body.email });
    if (userDetail) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetail.password
      );
      if (matched) {
        const token = jwt.sign(
          { email: userDetail.email },
          process?.env.SECRET_KEY
        );
        return res
          .status(201)
          .json({ msg: "Login Successfully", token, userDetail });
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Email not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Login failed" });
  }
};

const gerAllUsers = async (req, res) => {
  try {
    const userList = await User.findById();
    res.status(201).json({ userList });
  } catch (err) {
    res.status(400).json({ msg: "Failed to fetch user list" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userDetail = await User.find({ _id: req.params.userId });
    res.status(201).json({ userDetail });
  } catch (err) {
    res.status(400).json({ msg: "Failed to fetch user list" });
  }
};

module.exports = { registerNewUser, loginUser, gerAllUsers, getUserById };
