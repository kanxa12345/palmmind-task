const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const path = require("path");

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

module.exports = { registerNewUser };
