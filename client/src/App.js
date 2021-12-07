import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Router } from "@reach/router";
import Posts from "./Posts";

import Post from "./Post";
import apiService from "./apiService";

import Login from "./Login";
import Logout from "./Logout";
import Registration from "./Registration";

const API_URL = process.env.REACT_APP_API;
export default function App() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_URL}/allPosts`)
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data));
  // }, []);

  async function getData() {
    // We now use `apiService.get()` instead of `fetch()`
    try {
      const data = await apiService.get("/allPosts");
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  // Getting data from API
  useEffect(() => {
    getData();
  }, []);

  const getPost = (id) => {
    return posts.find((post) => post._id === id);
  };

  function logout() {
    try {
      apiService.logout();
      // Fetch data again after logging in
      window.location.reload();
    } catch (error) {
      console.error("Logout", error);
    }
  }


  function createUser(username, password) {
    try {
      apiService.createUser(username, password);
      // Fetch data again after logging in
      // window.location.reload();
    } catch (error) {
      console.error("Logout", error);
    }
  }

  // Login using API
  async function login(username, password) {
    try {
      await apiService.login(username, password);
      // Fetch data again after logging in
      getData();
      window.location.reload();
    } catch (error) {
      console.error("Login", error);
    }
  }
  async function addPost(content, owner, authorName, setErrorMessage) {

    if (content !== "" && authorName !== "" && content.length <= 500) {
      setErrorMessage("")

      // console.log(content, owner, authorName)
      const newPost = {
        //id: (Math.random() * 999).toString(),
        content: content,
        owner: owner,
        authorName: authorName,
        likes: 0,
        comments: [],
        date: Date.now(),
      };

      console.log(newPost);
      const resPost = await apiService.post(`/allPosts/create`,
        // PUT instead of POST because we overwrite the whole bin with a new version
        // https://jsonbin.io/api-reference/v3/bins/update
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // Simple version where we overwrite the entire "database" store with a new list
        newPost,
      )
      //   fetch(`${API_URL}/allPosts`)
      //     .then((response) => response.json())
      //     .then((data) => setPosts(data));
      setPosts([...posts, resPost]);
    }
    else {
      setErrorMessage("The content and the Author Name are required! The content needs to be less than 500 characters!")
    }
  }

  async function addLike(postId) {
    const post = posts.find((post) => post._id === postId);
    var index = posts.findIndex((post) => post._id === postId);
    // console.log({ ...post, likes: post.likes + 1 });
    const updatedPost = await apiService.put(`/allPosts/addLike/${postId}`,

      { ...post, likes: post.likes + 1 },
    )

    setPosts([...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)]);
  }

  //   fetch(`${API_URL}/allPosts/addLike/${postId}`, {
  //     // PUT instead of POST because we overwrite the whole bin with a new version
  //     // https://jsonbin.io/api-reference/v3/bins/update
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // Simple version where we overwrite the entire "database" store with a new list
  //     body: JSON.stringify({ ...post, likes: post.likes + 1 }),
  //   })
  //     .then((response) => response.json())
  //     .then(data => setPosts([...posts.slice(0, index), data, ...posts.slice(index + 1)]));
  // }

  async function addComment(postId, comment, user, setErrorMessage) {
    if (user !== "" && comment !== "" && comment.length >= 2) {
      setErrorMessage("")


      const post = await posts.find((post) => post._id === postId);
      var index = posts.findIndex((post) => post._id === postId);
      //var newComment = { _id: (Math.random() * 999).toString(), userName, content };
      const newComment = { userName: user, content: comment };

      const data = await apiService.put(`/allPosts/addComment/${postId}`,

        newComment,
      )

      setPosts([...posts.slice(0, index), data, ...posts.slice(index + 1)]);

      // fetch(`${API_URL}/allPosts/addComment/${postId}`, {
      //   // PUT instead of POST because we overwrite the whole bin with a new version
      //   // https://jsonbin.io/api-reference/v3/bins/update
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // Simple version where we overwrite the entire "database" store with a new list
      //   //body: JSON.stringify({ ...post, comments: [...post.comments, newComment] }),
      //   body: JSON.stringify(newComment)
      // })
      // fetch(`${API_URL}/allPosts`)
      //   .then((response) => response.json())
      //   .then((data) => setPosts(data));
      // .then(response => response.json())
      // .then(data => setPosts([...posts.slice(0, index), data, ...posts.slice(index + 1)]))
      // .catch(error => console.error(error))
    }
    else {
      setErrorMessage("The Content and the Author name are required! The content needs to be at least 2 characters!")
    }
  }

  let contents = <p>No Posts!</p>;
  if (posts.length > 0) {
    contents = (
      <Router>
        <Post path="/Post/:id" getPost={getPost} addLike={addLike} addComment={addComment}></Post>
        <Posts path="/" data={posts} addPost={addPost} ></Posts>


      </Router>
    );
  }

  let regPart = <Registration createUser={createUser}></Registration>;

  let loginPart = <Login login={login}></Login>;
  if (apiService.loggedIn()) {
    loginPart = <Logout logout={logout}></Logout>;

  }
  return (
    <>
      {regPart}
      {loginPart}
      {contents}


    </>
  );
}
