const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/api/question page");
});
router.get("/question", (req, res) => {
  console.log("/api/question/delete page");
});

const getAllQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
};

module.exports = {
  getAllQuestions,
};
