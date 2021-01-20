// -->Burda Routerlari tek merkezden yonetme islemi
const express = require("express");
const question = require("./question");
const auth = require("./auth");

const router = express.Router();

// main router
router.use("/questions", question);
router.use("/auth", auth);

module.exports = router;
