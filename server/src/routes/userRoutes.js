const express = require("express");
const { registerNewUser, loginUser, gerAllUsers, getUserById } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/users", gerAllUsers);
router.get("/user/:userId", getUserById);
module.exports = router;
