const express = require("express");
const { questionGet } = require("../controllers/question");

const router = express.Router(); // aslinda bu bir nevi middleware

// api/question
router.get("/", questionGet);

module.exports = router;
