const Joi = require("joi");
const { objectId } = require("./custom.validation");

const validVideoId = {
  params: Joi.object().keys({
    videoid: Joi.string().custom(objectId)
  }),
};

const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.string(),//(value) => { value.split(',').Joi.array.items(Joi.string().valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All')) },
    sortBy: Joi.string().valid('releaseDate','viewCount'),
    contentRating: Joi.string().valid('Anyone',"7+",'12+','16+','18+'),
  }),
};

const uploadVideo = {
  body: Joi.object().keys({
      videoLink: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string().required(),
      contentRating: Joi.string().required(),
      releaseDate: Joi.string().required(),
      previewImage: Joi.string().required(),
  }),
};



module.exports = {
  validVideoId,
  getVideos,
  uploadVideo
};
