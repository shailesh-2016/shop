const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

exports.User = model("User", userSchema);
