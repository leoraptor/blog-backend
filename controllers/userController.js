const UserModal = require("../models/userModal");
const CommentModal = require("../models/commentModal");
const PostModal = require("../models/postModal");
const bcrypt = require("bcrypt");

//get user
module.exports.getUser = async (req, res) => {
  console.log(req.params.id, "j");
  try {
    const user = await UserModal.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//update user
module.exports.updateUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Missing id" });
    }
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Missing feilds" });
    }

    const isUserExist = await UserModal.findOne({ _id: req.params.id });

    if (!isUserExist) {
      return res.status(400).json({ message: "No user found for the id" });
    }

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(password, salt);
    }
    const updateTheUser = await UserModal.findByIdAndUpdate(
      req.params.id,
      {
        $set: { username: username, email: email, password: req.body.password },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      user: updateTheUser,
      message: "Updated succesfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//delete user
module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }
  const isUserExist = await UserModal.findOne({ _id: id });

  if (!isUserExist) {
    return res.status(400).json({ message: "No user found for the given id" });
  }

  try {
    await UserModal.findByIdAndDelete(id);
    await PostModal.deleteMany({ userId: id });
    await CommentModal.deleteMany({ userId: id });
    res.status(200).json({
      status: "success",

      message: "User deleted succesfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};
