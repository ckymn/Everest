const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("/api/question page");
});
router.get("/delete", (req, res) => {
  console.log("/api/question/delete page");
});

router
.route.
const getAllQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
};

module.exports = {
  getAllQuestions,
};
