const CommentModal = require("../models/commentModal");

//get all comment of post
module.exports.allComments = async (req, res) => {
  try {
    if (!req.query.postId) {
      return res.status(400).json({ status: "failed", message: "missing id" });
    }
    const allComments = await CommentModal.find({ postId: req.query.postId });
    res.status(200).json({
      status: "success",
      data: allComments,
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//add comment
module.exports.addComment = async (req, res) => {
  try {
    const { comment, author, postId, userId } = req.body;
    if (!comment || !author || !postId || !userId) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing feilds" });
    }
    const newComment = await CommentModal.create(req.body);
    return res.status(200).json({
      status: "success",
      data: newComment,
      message: "Comment added successfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//update comment
module.exports.updateComment = async (req, res) => {
  try {
    const { comment, author, postId, userId } = req.body;
    if (!comment || !author || !postId || !userId) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing feilds" });
    }

    const isCommentExist = await CommentModal.find({
      _id: req.query.id,
    });
    if (isCommentExist.length > 0) {
      const updateComment = await CommentModal.findByIdAndUpdate(
        req.query.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        data: updateComment,
        message: "Comment updated successfully",
      });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Comment does not exists" });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//delete comment
module.exports.deleteComment = async (req, res) => {
  try {
    const isCommentExist = await CommentModal.find({
      _id: req.query.id,
    });

    if (isCommentExist.length > 0) {
      await CommentModal.findByIdAndDelete(req.query.id);
      return res.status(200).json({
        status: "success",
        message: "Comment deleted successfully",
      });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Comment does not exists" });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};
