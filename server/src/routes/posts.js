import express from "express";
import Post from "../models/post.js";

const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

postRoutes.put("/create", async (req, res) => {
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

// postRoutes.route('/addLike/:id').put((req, res, next) => {
//   try{
//     const post = await Post.findByIdAndUpdate(req.body.id);
//     $set:req.body
//   }
//   post.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Student updated successfully !')
//     }
//   })
// })

postRoutes.put('/addLike/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes++;
    post.save();
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be liked",
      details: error.toString(),
    });
  }
});

//lifting state up to the parrent for adding comment and update the page
///addComment/?id=:id


postRoutes.put('/addComment/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate({ _id: req.params.id },
      {
        $push: { comments: req.body }
        //req.user.id
      },
      {
        retunDocument: 'after'
      }

    );
    // post.comments = [{ ...post.comments }, [req.body]];
    // post.save();
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Post could not be comment",
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
