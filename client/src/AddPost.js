import React, { useState } from "react";
/*
A component that can add new numbers to a sum. The component renders the following:

- The sum as a number (text) inside a <p> tag.
- An input text field (HTML form element)
- A button (HTML button element). When clicking the button, the component should add the number in the text field to the sum that is displayed.
*/

function AddPost(props) {

    const [content, setContent] = useState("");
    const [owner, setOwner] = useState("")
    const [authorName, setAuthorName] = useState("");

    const { addPost } = props;

    function clearInput() {
        setContent("");
        setOwner("");
        setAuthorName("");

    }
    return (
        clearInput(),
        <>

            <p>Content:</p>
            <input onChange={(event) => setContent(event.target.value)} type="text" />
            <div id="ContentId" />
            <p>Owner:</p>
            <input onChange={(event) => setOwner(event.target.value)} type="text" />
            <div id="OwnerId" />
            <p>Author name:</p>
            <input onChange={(event) => setAuthorName(event.target.value)} type="text" />
            <div id="AuthorNameId" />

            <button type="button" onClick={(event) => {

                addPost(content, owner, authorName);

            }}>Add Post </button>


        </>
    );
}

export default AddPost;
