import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Router, Link } from "@reach/router";
import Posts from "./Posts";

import Post from "./Post";


const API_URL = process.env.REACT_APP_API;
export default function App() {
  const [posts, setPosts] = useState([
  ]);

  useEffect(() => {
    fetch(`${API_URL}/allPosts`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  //var [nameOfIngre, setNameOfIngre] = useState("pasta");


  const getPost = (id) => {
    return posts.find((post) => post.id === id);
  };
  // You need to implement "function getPost(id)" somewhere else in App.js

  function addPosts(title, content, owner, authorName, likes, comments, date) {
    if (!title) {
      document.getElementById("TitleId").innerText = "Title is required";
      return;

    }
    console.log(title, desc, ingredients)
    const newRecipe = {
      id: Math.random() * 999,
      title: title,
      description: desc,
      ingredients: ingredients,
      cookingTime: cookingTime,
      submitter: submitter
    };

    fetch(`${API_URL}/create`, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.json())
      .then(data => setPosts(data));
  }




  return (
    <>
      <form className="form-inline">
        <div className="form-group">
          <input type="text" onChange={(event) => setNameOfIngre(event.target.value)} className="form-control" />

          <Link to={`/recipes/with/${nameOfIngre}`}>
            Search
          </Link>
        </div>
      </form>



      <Router>

        <Recipes path="/" data={recipes} addPosts={addPosts}></Recipes>
        <Recipes path="/recipes/with/:nameOfIngre" data={recipes} addPosts={addPosts} />
        <Recipe path="/Recipe/:id" getPost={getPost}></Recipe>
      </Router>
    </>
  );
}
