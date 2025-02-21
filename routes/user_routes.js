const express = require("express");
const router = express.Router();

const { login, data } = require("../controller/user_controller")

router.route("/").post(login);
router.route("/data").get(data);

module.exports = router;