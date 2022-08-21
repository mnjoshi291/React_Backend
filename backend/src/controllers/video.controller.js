const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const videoService = require("../services/video.services")

const getVideos = catchAsync(async (req, res) => {
  const { sortBy, title, genres, contentRating } = req.query;
  if (!sortBy && !title && !genres && !contentRating) {
    const videos = await videoService.getAllVideos();
        res.status(httpStatus.OK).send({ videos: videos });
  } else if (sortBy) {
    if (sortBy === "viewCount") {
      const sortByViewCount = await videoService.sortVideosByViewCount();
      res.status(httpStatus.OK).json({ videos: sortByViewCount });
    } else if (sortBy === "releaseDate") {
      const sortByReleaseDate = await videoService.sortVideosByReleaseDatet();
      res.status(httpStatus.OK).json({ videos: sortByReleaseDate });
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `"sortBy" must be one of [viewCount, releaseDate]`
      );
    }
  } else if (contentRating || genres || title) {
    const videos = await videoService.findVideosByQuery(
      contentRating,
      genres,
      title
    );

    res.status(httpStatus.OK).json({ videos: videos });
  }
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  res.status(httpStatus.OK).send(video);
});

const createNewVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
});

const updateVideoVotes = catchAsync(async (req, res) => {
  const result = await videoService.updateVotes(
    req.params.videoId,
    req.body.vote
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const updateVideoViews = catchAsync(async (req, res) => {
  const result = await videoService.updateViews(req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideos,
  getVideoById,
  createNewVideo,
  updateVideoVotes,
  updateVideoViews,
};
