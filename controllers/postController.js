const PostModal = require("../models/postModal");

//get single post based on id
module.exports.getPost = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({ status: "failed", message: "missing id" });
    }

    const postByid = await PostModal.findById(req.query.id);
    res.status(200).json({
      status: "success",
      data: postByid,
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//get all posts
module.exports.allPost = async (req, res) => {
  try {
    const querySearch = { title: { $regex: req.query.search } };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const allPost = await PostModal.find(req.query.search ? querySearch : null)
      .skip(skip)
      .limit(limit);

    const postCount = await PostModal.countDocuments(
      req.query.search ? querySearch : null
    );
    res.status(200).json({
      status: "success",
      data: {
        result: allPost,
        currentPage: page,
        totalPages: Math.ceil(postCount / limit),
        total: postCount,
        limit: limit,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//get all posts of user
module.exports.allPostOfUser = async (req, res) => {
  try {
    const allPost = await PostModal.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      data: allPost,
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//add post
module.exports.addPost = async (req, res) => {
  try {
    const { title, desc, image, username, userId } = req.body;
    if (!title || !desc || !image || !username || !userId) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing feilds" });
    }
    const isPostAlreadyPresent = await PostModal.find({
      title: title,
    });

    if (isPostAlreadyPresent.length > 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post already exists" });
    }

    const newPost = await PostModal.create(req.body);
    return res.status(200).json({
      status: "success",
      data: newPost,
      message: "Post added successfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//update post
module.exports.updatePost = async (req, res) => {
  try {
    const { title, desc, image, username, userId } = req.body;
    if (!title || !desc || !image || !username || !userId) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing feilds" });
    }

    const isPostAlreadyPresent = await PostModal.find({
      _id: req.query.id,
    });
    if (isPostAlreadyPresent.length > 0) {
      const updatePost = await PostModal.findByIdAndUpdate(
        req.query.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        data: updatePost,
        message: "Post updated successfully",
      });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Post does not exists" });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//delete post
module.exports.deletePost = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({ status: "failed", message: "missing id" });
    }
    const isPostAlreadyPresent = await PostModal.find({
      _id: req.query.id,
    });

    if (isPostAlreadyPresent.length > 0) {
      await PostModal.findByIdAndDelete(req.query.id);
      return res.status(200).json({
        status: "success",
        message: "Post deleted successfully",
      });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Post does not exists" });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};
