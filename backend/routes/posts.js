// backend/routes/posts.js
const router = require("express").Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post("/create", verify, async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send("Post created");
});

router.put("/:id", verify, async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.send("Post updated");
});

router.delete("/:id", verify, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send("Post deleted");
});

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ created_at: -1 });
  res.json(posts);
});

module.exports = router;