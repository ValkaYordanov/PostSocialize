import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Router } from "@reach/router";
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
    return posts.find((post) => post._id === id);
  };
  // You need to implement "function getPost(id)" somewhere else in App.js

  function addPost(content, owner, authorName) {
    if (!content) {
      document.getElementById("ContentId").innerText = "Content is required";
      return;

    }
    if (!authorName) {
      document.getElementById("AuthorNameId").innerText = "AuthorName is required";
      return;

    }
    console.log(content, owner, authorName)
    const newPost = {
      id: Math.random() * 999,
      content: content,
      owner: owner,
      authorName: authorName,
      likes: 0,
      date: "date is today",
    };

    fetch(`${API_URL}/allPosts/create`, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(data => setPosts([...posts, newPost]));
  }




  return (
    <>

      <Router>

        <Posts path="/" data={posts} addPost={addPost}></Posts>

        <Post path="/Post/:id" getPost={getPost}></Post>
      </Router>
    </>
  );
}
