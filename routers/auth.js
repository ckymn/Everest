const express = require("express");
const { register, getUser } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api/auth");
});
router.get("/register", (req, res) => {
  res.send("/api/auth/register page");
});

// api/auth/register (postman da aratma)
router.post("/register", register);
// JWT cagirma islemi
router.get("/profile", getAccessToRoute, getUser); //getAccessToRoute burda middleware gorevi goruyor

module.exports = router;
