const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userController = require("../controllers/users");

router.post("/", userController.getUser);

module.exports = router;
