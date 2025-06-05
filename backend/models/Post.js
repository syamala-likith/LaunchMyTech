// backend/models/Post.js
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Post", postSchema);