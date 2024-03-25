const express = require("express");
const { registerNewUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerNewUser);
module.exports = router;
