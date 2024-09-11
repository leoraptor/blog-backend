const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is missing"],
    minlength: [3, "User name must be 3 digits"],
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
    minlength: [6, "password must be 6 digits"],
    select: false,
  },
});

const UserModal = mongoose.model("User", UserSchema);

module.exports = UserModal;
