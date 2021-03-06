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


  const getPost = (id) => {
    return posts.find((post) => post._id === id);
  };


  async function addPost(content, owner, authorName, setErrorMessage) {
    // if (!content) {
    //   document.getElementById("ContentId").innerText = "Content is required";
    //   return;

    // }
    // if (!authorName) {
    //   document.getElementById("AuthorNameId").innerText = "AuthorName is required";
    //   return;

    // }

    if (content != "" && authorName != "" && content.length <= 500) {
      setErrorMessage("")

      console.log(content, owner, authorName)
      const newPost = {
        id: (Math.random() * 999).toString(),
        content: content,
        owner: owner,
        authorName: authorName,
        likes: 0,
        comments: [],
        date: Date.now(),
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
      fetch(`${API_URL}/allPosts`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }
    else {
      setErrorMessage("The content and the Author Name are required! The content needs to be less than 500 characters!")
    }
  }

  function addLike(postId) {
    const post = posts.find((post) => post._id === postId);
    var index = posts.findIndex((post) => post._id === postId);
    console.log({ ...post, likes: post.likes + 1 });
    fetch(`${API_URL}/allPosts/addLike/${postId}`, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify({ ...post, likes: post.likes + 1 }),
    })
      .then((response) => response.json())
      .then(data => setPosts([...posts.slice(0, index), data, ...posts.slice(index + 1)]));
  }

  async function addComment(postId, comment, user, setErrorMessage) {
    if (user != "" && comment != "" && comment.length >= 2) {
      setErrorMessage("")


      const post = posts.find((post) => post._id === postId);
      //var index = posts.findIndex((post) => post._id === postId);
      //var newComment = { _id: (Math.random() * 999).toString(), userName, content };
      const newComment = { userName: user, content: comment };

      fetch(`${API_URL}/allPosts/addComment/${postId}`, {
        // PUT instead of POST because we overwrite the whole bin with a new version
        // https://jsonbin.io/api-reference/v3/bins/update
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Simple version where we overwrite the entire "database" store with a new list
        //body: JSON.stringify({ ...post, comments: [...post.comments, newComment] }),
        body: JSON.stringify(newComment)
      })
      fetch(`${API_URL}/allPosts`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
      // .then(response => response.json())
      // .then(data => setPosts([...posts.slice(0, index), data, ...posts.slice(index + 1)]))
      // .catch(error => console.error(error))
    }
    else {
      setErrorMessage("The Content and the Author name are required! The content needs to be at least 2 characters!")
    }
  }

  return (
    <>

      <Router>
        <Post path="/Post/:id" getPost={getPost} addLike={addLike} addComment={addComment}></Post>
        <Posts path="/" data={posts} addPost={addPost} ></Posts>


      </Router>
    </>
  );
}
