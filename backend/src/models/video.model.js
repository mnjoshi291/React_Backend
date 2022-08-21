const mongoose = require("mongoose");

const videosSchema = mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    contentRating: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: String,
      required: true,
      trim: true,
    },
    previewImage: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      upVotes: { type: Number, required: true, default: 0 },
      downVotes: { type: Number, required: true, default: 0 },
    },
    viewCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);


const Videos = mongoose.model("Videos", videosSchema);

module.exports = { Videos };
