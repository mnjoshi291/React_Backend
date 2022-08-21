const express = require("express");
const {
  videoIdValidation,
  videoValidation,
} = require("../../middlewares/video.validation")
const videosController = require("../../controllers/video.controller")
const router = express.Router();

router.get("/videos", videosController.getVideos);

router.get(
  "/videos/:videoId",
  videoIdValidation,
  videosController.getVideoById
);

router.post("/videos", videoValidation, videosController.createNewVideo);

router.patch(
  "/videos/:videoId/votes",
  videoIdValidation,
  videosController.updateVideoVotes
);

router.patch(
  "/videos/:videoId/views",
  videoIdValidation,
  videosController.updateVideoViews
);

module.exports = router;