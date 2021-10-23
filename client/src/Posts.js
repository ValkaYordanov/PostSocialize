import React from "react";
import { Link } from "@reach/router";
import AddPost from "./AddPost";

// Nothing special happens in this component, except for the Link
function Posts(props) {
    var { data, addPost } = props;

    console.log(data)
    return (
        <div className="background-orange">

            <h1>list of post</h1>
            <ul>
                {data.map(post =>
                    <li>
                        <Link to={`/Post/${post._id}`}>Post</Link>
                    </li>
                )}
            </ul>



            <br />
            <Link to="/">Go back</Link>

        </div>
    );
}

export default Posts;
