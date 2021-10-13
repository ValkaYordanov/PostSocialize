import express from "express";
import Recipe from "../models/recipe.js";

const recipeRoutes = express.Router();

recipeRoutes.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

recipeRoutes.post("/", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201);
    res.json(recipe);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Recipe could not be created",
      details: error.toString(),
    });
  }
});

recipeRoutes.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404);
      res.json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

export default recipeRoutes;
