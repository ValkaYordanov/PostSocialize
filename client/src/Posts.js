import React from "react";
import { Link } from "@reach/router";
import AddPost from "./AddPost";

// Nothing special happens in this component, except for the Link
function Posts(props) {
    var { data, addPost } = props;


    function readMore(content) {

        return content.substring(0, 25);
    }

    console.log(data)
    return (
        <div className="background-orange">

            <br />
            <Link to="/">Go back</Link>
            <AddPost addPost={addPost} />

            <h1>list of post</h1>

            {data.map(post =>
                <p>
                    <table>
                        <tr>
                            <th>
                                <Link to={`/Post/${post._id}`}>Post by {post.authorName}</Link>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                {readMore(post.content)}...
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <td>
                                    Likes:{post.likes}
                                </td>
                                <td>
                                    Comments: {(post.comments).length}
                                </td>
                            </td>
                        </tr>
                    </table>
                </p>

            )
            }





        </div >

    );
}

export default Posts;
