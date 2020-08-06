//Router imported
var express = require("express");
var router = express.Router();
const { signout } = require("../controllers/authentication");

router.get("/signout", signout);

//export routes
module.exports = router;
