import { deletePost, getPostById, updatePost } from "./api.mjs";
import { getUser } from "./localstorage.mjs";
import { getToken } from "./localstorage.mjs";

const postId = new URLSearchParams(window.location.search).get("id");

const postSection = document.querySelector("#post-section");
const profilePictureWrapper = document.querySelector("#profile-picture");
const postContent = document.querySelector("#post-content");
const postEdit = document.querySelector("#post-edit");
const postTitle = document.querySelector("#post-title");
const postAuthor = document.querySelector("#post-author");
const postMedia = document.querySelector("#post-media");
const postBody = document.querySelector("#post-body");

const authorControlsWrapper = document.querySelector("#author-controls");

let thePost = null;
let isEditing = false;

getPostById(postId).then(post => {
    console.dir(post);

    if (post.errors) {
        throw new Error(post.status);
    }

    thePost = post;
    renderPost();

    const myUsername = getUser().username;
    if (post.author.name == myUsername) {
        displayAuthorControls();
    }
}).catch((err) => {
    console.error(err);
    postSection.innerHTML = `
    <div class="alert alert-danger"><h3>Something went wrong</h3><p>The post may have been deleted. Please return to the <a href="index.html">homepage</a> or try again later.</p></div>
`;
});

function renderPost() {
    postTitle.innerText = thePost.title;
    postAuthor.innerText = thePost.author.name;
    postBody.innerText = thePost.body;

    if (thePost.author.avatar && thePost.author.avatar.length > 3) {
        profilePictureWrapper.innerHTML = `<img src="${thePost.author.avatar}" class="rounded-circle me-3" alt="Profile picture" width="100" height="100"/>`;
    }

    if (thePost.media && thePost.media.length > 3) {
        postMedia.innerHTML = `<img src="${thePost.media}" class="img-fluid rounded"/>`;
    }
}

function displayAuthorControls() {
    let editButton = document.createElement("button");
    editButton.className = "btn btn-info";
    editButton.innerText = "Edit";

    let submitButton = document.createElement("button");
    submitButton.className = "btn btn-success d-none";
    submitButton.innerText = "Save changes";

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerText = "Delete";

    authorControlsWrapper.append(editButton, submitButton, deleteButton);

    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        isEditing = !isEditing;
        toggleEdit(editButton, submitButton);
    });

    submitButton.addEventListener("click", (e) => submitEdit(e, editButton, submitButton));

    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();

        deletePost(postId).then((res) => {
            if (res == 204) {
                // Post was deleted
                postSection.innerHTML = `
                    <div class="alert alert-success"><h3>The post has been deleted</h3><p>The post was successfully deleted. Click <a href="index.html">here</a> to return to the homepage.</p></div>
                `;
            }
            else {
                // Something went wrong
            }
        })
    });
}

function toggleEdit(editButton, submitButton) {
    if (isEditing) {
        editButton.innerText = "Cancel";
        document.querySelector("#edit-post-title").value = thePost.title;
        document.querySelector("#edit-post-body").value = thePost.body;

        postContent.classList.add("d-none");
        postEdit.classList.remove("d-none");
        submitButton.classList.remove("d-none");
    }
    else {
        editButton.innerText = "Edit";
        postContent.classList.remove("d-none");
        postEdit.classList.add("d-none");
        submitButton.classList.add("d-none");
    }
}

async function submitEdit(e, editButton, submitButton) {
    e.preventDefault();

    const postTitle = document.querySelector("#edit-post-title").value;
    const postBody = document.querySelector("#edit-post-body").value;
    const titleError = document.querySelector("#edit-post-title-error");
    const bodyError = document.querySelector("#edit-post-body-error");

    titleError.innerText = "";
    bodyError.innerText = "";


    const token = getToken();

    if (!token) {
        location.href = "login.html";
    }

    let error = false;

    if (!postTitle || postTitle.length <= 3) {
        error = true;
        titleError.innerText = "Please provide a title longer than 3 characters";
    }

    if (!postContent || postContent.length <= 10) {
        error = true;
        bodyError.innerText = "Please provide a text longer than 10 characters";
    }

    // Don't do anything if we have an error
    if (error) {
        return;
    }

    // Create post if we don't have an error
    updatePost(postId, postTitle, postBody).then(post => {
        thePost = post;
        renderPost();

        isEditing = false;
        toggleEdit(editButton, submitButton);
    })
}