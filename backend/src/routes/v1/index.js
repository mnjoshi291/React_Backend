const express = require("express");
const router = express.Router();
const videoRoute = require("./video.route");

router.use("/videos", videoRoute);

module.exports = router;
