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
      .then((response) => response.json())
      .then(data => setPosts([...posts, newPost]));
  }

  function addLike(postId) {
    const post = posts.find((post) => post._id === postId);
    post.likes++;
    fetch(`${API_URL}/allPosts/addLike/${postId}`, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then(data => data.post);
  }

  function addComment(postId, content, userName) {

    const post = posts.find((post) => post._id === postId);

    //var newComment = { _id: (Math.random() * 999).toString(), userName, content };
    var newComment = { 'userName': userName, 'content': content };
    post.comments = [...post.comments, newComment];
    post.save();
    console.log(post.comments)
    fetch(`${API_URL}/allPosts/addComment/${postId}`, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      //headers: {
      // "Content-Type": "application/json",
      //},
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then(data => data.post);
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
