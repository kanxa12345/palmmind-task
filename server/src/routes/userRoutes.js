const express = require("express");
const { registerNewUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
module.exports = router;
