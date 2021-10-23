import React from "react";
import { Link } from "@reach/router";

// Nothing special happens in this component, except for the Link
function Post(props) {
    const post = props.getPost(props.id); // "props.id" contains the id in "/recipe/:id"


    console.log(post);
    return (
        <div className="background-orange">
            <h1>{post.content}</h1>
            <p>{post.owner}</p>
            <p>{post.authorName}</p>
            <p>{post.date}</p>
            <Link to="/"> Go to home</Link>
        </div>
    );
}

export default Post;
