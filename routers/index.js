// -->Burda Routerlari tek merkezden yonetme islemi  
const express = require("express");
const question = require("./question")
const auth = require("./auth")

//--->> (/api) deyince buraya aktarilacak
const router = express.Router();

// --->> Routers (yonlendiriciler)i kullanmak
router.use("/questions",question);
router.use("/auth",auth);

module.exports = router;