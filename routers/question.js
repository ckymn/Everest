const express = require("express");
const {getAllQuestions} = require("../controllers/question");

const router = express.Router(); // aslinda bu bir nevi middleware  

// api/question
router.get("/", getAllQuestions); 


module.exports = router;