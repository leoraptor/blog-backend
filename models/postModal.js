const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is missing"],
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is missing"],
    },
    image: {
      type: String,
      required: [true, "Image is needed"],
    },
    username: {
      type: String,
      required: [true, "User name is missing"],
    },
    userId: {
      type: String,
      required: [true, "user id is missing"],
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

const PostModal = mongoose.model("Post", PostSchema);

module.exports = PostModal;
