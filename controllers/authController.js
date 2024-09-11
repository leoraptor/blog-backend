const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModal = require("../models/userModal");

//Rigister
module.exports.userRegister = async (req, res) => {
  try {
    const { username, email } = req.body;

    const isUserExist = await userModal.find({
      email: email,
    });

    if (isUserExist.length > 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = await userModal.create({
        username: username,
        email: email,
        password: hash,
      });

      const { password, ...other } = newUser._doc;

      return res.status(201).json({
        status: "success",
        user: other,
        message: "User created succesfully",
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//login
module.exports.userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        status: "failed",
        message: "please provide email or password",
      });
    }
    const isUserExist = await userModal
      .findOne({
        email: email,
      })
      .select("+password");

    if (isUserExist) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        isUserExist.password
      );

      if (isPasswordCorrect) {
        // Generate  token

        const token = jwt.sign({ id: isUserExist._id }, process.env.SKEY, {
          expiresIn: "1d",
        });
        const { password, ...toSendLoginResponse } = isUserExist._doc;
        return res
          .cookie("access_token", token)
          .status(200)
          .json({
            status: "success",
            result: {
              user: { ...toSendLoginResponse, access_token: token },
              message: "Login succesfull",
            },
          });
      } else {
        return res
          .status(400)
          .json({ status: "failed", message: "Wrong credentials" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

//logout
module.exports.userLogout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(200)
      .json({ status: "success", message: "Logged out succesfull" });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};
