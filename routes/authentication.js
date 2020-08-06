//Router imported
var express = require("express");
var router = express.Router();
const { signup, signout } = require("../controllers/authentication");

router.post("/signup", signup);

router.get("/signout", signout);

//export routes
module.exports = router;
