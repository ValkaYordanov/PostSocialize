import express from "express";
import Post from "../models/post.js";

const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

postRoutes.post("/create", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be created",
      details: error.toString(),
    });
  }
});

postRoutes.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404);
      res.json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

export default postRoutes;
