const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const mongoId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const idSchema = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(mongoId),
  }),
};

const videoSchema = {
  body: Joi.object().keys({
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    contentRating: Joi.string().required(),
    releaseDate: Joi.string().required(),
    previewImage: Joi.string().required(),
  }),
};

const videoIdValidation = (req, res, next) => {
  const result = idSchema.params.validate(req.params);
  if (result.error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"id" must be a valid mongo id`);
  }

  next();
};

const videoValidation = (req, res, next) => {
  const result = videoSchema.body.validate(req.body);
  if (result.error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `video details must be a valid`);
  }
  next();
};

module.exports = {
  videoIdValidation,
  videoValidation,
};
