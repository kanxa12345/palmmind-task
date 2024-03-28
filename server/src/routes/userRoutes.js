const express = require("express");
const {
  registerNewUser,
  loginUser,
  gerAllUsers,
  changePassword,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/users", gerAllUsers);
router.patch("/user", changePassword);
module.exports = router;
