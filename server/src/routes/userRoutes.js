const express = require("express");
const { registerNewUser, loginUser, gerAllUsers } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/users", gerAllUsers);
module.exports = router;
