import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";

// Nothing special happens in this component, except for the Link
function Post(props) {

    const post = props.getPost(props.id); // "props.id" contains the id in "/recipe/:id"
    const { addLike } = props;
    const { addComment } = props;
    const [content, setContent] = useState("");
    const [likes, setLikes] = useState(post.likes);

    const [userName, setAuthorName] = useState("");

    console.log(post);
    return (
        <div className="background-orange">
            <p>
                <table>
                    <tr>
                        <td>Date:
                            {new Intl.DateTimeFormat('en-GB', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(post.date))}
                        </td>
                    </tr>
                    <tr>
                        <td>{post.content}</td>
                    </tr>
                    <tr>
                        <td>Owner of the quote: {post.owner}</td>
                    </tr>
                    <tr>
                        <td>Author Name: {post.authorName}</td>
                    </tr>
                    <tr>
                        <td>
                            <td>
                                Likes:{likes}
                            </td>
                            <td>
                                <button type="button" onClick={(event) => {

                                    // fetch(`${API_URL}/allPosts/addLike/${post._id}`, {
                                    //     // PUT instead of POST because we overwrite the whole bin with a new version
                                    //     // https://jsonbin.io/api-reference/v3/bins/update
                                    //     method: "PUT",
                                    //     //headers: {
                                    //     // "Content-Type": "application/json",
                                    //     //},
                                    //     // Simple version where we overwrite the entire "database" store with a new list
                                    //     //body: JSON.stringify(data),
                                    // })
                                    //     .then((response) => response.json())
                                    //     .then(data => setLikes(data.likes));
                                    addLike(post._id);
                                    setLikes(post.likes);

                                }}>Like</button>
                            </td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Comments: {(post.comments).length}
                        </td>
                    </tr>
                </table>
            </p>
            <p>Content:</p>
            <input onChange={(event) => setContent(event.target.value)} type="text" />
            <div id="ContentId" />

            <p>Author name:</p>
            <input onChange={(event) => setAuthorName(event.target.value)} type="text" />
            <div id="AuthorNameId" />

            <button type="button" onClick={(event) => {

                addComment(post._id, content, userName);

            }}>Add Comment</button>
            <p>
                <table>
                    <tr>
                        <th>All Comments</th>
                    </tr>
                    {(post.comments).map(comment =>
                        <>
                            <tr>
                                <td>{comment.userName}: {comment.content}</td>
                            </tr>

                        </>

                    )
                    }
                </table>
            </p>
            <Link to="/"> Go to home</Link>
        </div>
    );
}

export default Post;
