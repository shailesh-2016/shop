const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String, default: "" }, // ✅ Added for Google login
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
