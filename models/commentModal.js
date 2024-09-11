const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "comment is missing"],
    },
    author: {
      type: String,

      required: [true, "author is missing"],
    },
    postId: {
      type: String,
      required: [true, "post id is needed"],
    },

    userId: {
      type: String,
      required: [true, "user id is missing"],
    },
  },
  { timestamps: true }
);

const CommentModal = mongoose.model("Comment", CommentSchema);

module.exports = CommentModal;
