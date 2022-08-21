const { Videos } = require("../models/video.model")
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getAllVideos = async () => {
  const result = await Videos.find({});
  return result;
};

const getVideoById = async (id) => {
  const result = await Videos.findById(id);
  return result;
};

const sortVideosByViewCount = async () => {
  const result = await getAllVideos();
  result.sort(function (a, b) {
    return b.viewCount - a.viewCount;
  });
  return result;
};

const sortVideosByReleaseDatet = async () => {
  const result = await getAllVideos();
  result.sort(function (a, b) {
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  });
  return result;
};

const createVideo = async (video) => {
  const result = await Videos.create(video);
  return result;
};

const updateVotes = async (id, vote) => {
  let result = await getVideoById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  if (vote === "upVote") {
    result.votes.upVotes += 1;
  } else if (vote === "downVote") {
    result.votes.downVotes += 1;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `"vote" must be one of [upVote, downVote]`
    );
  }
  await result.save();
  return result;
};

const updateViews = async (id, vote) => {
  let result = await getVideoById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  result.viewCount++;
  await result.save();
  return result;
};

const findByGenre = async (genresList, genreSplitList) => {
  let result;
  for (let i = 0; i < genreSplitList.length; i++) {
    if (!genresList.includes(genreSplitList[i])) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `"genre" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`
      );
    }
  }

  if (!genreSplitList.includes("All")) {
    result = await Videos.find({
      $or: [
        {
          genre: genreSplitList.includes(genresList[0])
            ? genresList[0]
            : undefined,
        },
        {
          genre: genreSplitList.includes(genresList[1])
            ? genresList[1]
            : undefined,
        },
        {
          genre: genreSplitList.includes(genresList[2])
            ? genresList[2]
            : undefined,
        },
        {
          genre: genreSplitList.includes(genresList[3])
            ? genresList[3]
            : undefined,
        },
        {
          genre: genreSplitList.includes(genresList[4])
            ? genresList[4]
            : undefined,
        },
      ],
    });
  } else if (genreSplitList.includes("All")) {
    result = await getAllVideos();
  }

  return result;
};

const convertToNumber = (contentRating) => {
  const splitRating = contentRating.split("+");
  return Number(splitRating[0]);
};

const findByContentRating = (allVideos, contentRating, contentRatingList) => {
  const queryContentRating = convertToNumber(contentRating);

  if (contentRatingList.includes(contentRating)) {
    const result = allVideos.filter((video) => {
      return convertToNumber(video.contentRating) >= queryContentRating;
    });
    return result;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `\"contentRating\" must be one of [Anyone, 7+, 12+, 16+, 18+, All]`
    );
  }
};

const findByTitle = (allVideos, title) => {
  const result = allVideos.filter((video) => {
    return video.title.toLowerCase().includes(title.toLowerCase());
  });

  if (result.length <= 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No video found with matching title"
    );
  }
  return result;
};

const findVideosByQuery = async (contentRating, genres, title) => {
  const genresList = [
    "Education",
    "Sports",
    "Movies",
    "Comedy",
    "Lifestyle",
    "All",
  ];
  const contentRatingList = ["Anyone", "7+", "12+", "16+", "18+", "All"];
  const genreSplitList = genres ? genres.split(",") : undefined;
  let result;
  if (contentRating && !genres && !title) {
    const allVideos = await getAllVideos();
    result = findByContentRating(allVideos, contentRating, contentRatingList);
  } else if (!contentRating && !genres && title) {
    const allVideos = await getAllVideos();
    result = findByTitle(allVideos, title);
  } else if (!contentRating && genres && !title) {
    console.log("reached")
    result = await findByGenre(genresList, genreSplitList);
  } else if (contentRating && genres && !title) {
    const genreResult = await findByGenre(genresList, genreSplitList);
    result = findByContentRating(genreResult, contentRating, contentRatingList);
  } else if (contentRating && !genres && title) {
    const allVideos = await getAllVideos();
    const contentRatingResult = findByContentRating(
      allVideos,
      contentRating,
      contentRatingList
    );
    result = findByTitle(contentRatingResult, title);
  } else if (!contentRating && genres && title) {
    const genreResult = await findByGenre(genresList, genreSplitList);
    result = findByTitle(genreResult, title);
  } else if (contentRating && genres && title) {
    const genreResult = await findByGenre(genresList, genreSplitList);
    const contentRatingResult = findByContentRating(
      genreResult,
      contentRating,
      contentRatingList
    );
    result = findByTitle(contentRatingResult, title);
  }
  return result;
};

module.exports = {
  getAllVideos,
  getVideoById,
  sortVideosByViewCount,
  sortVideosByReleaseDatet,
  createVideo,
  updateVotes,
  updateViews,
  findVideosByQuery,
};
