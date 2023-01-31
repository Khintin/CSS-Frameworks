import { createPost, getPosts } from "./api.mjs";
import { getToken } from "./localstorage.mjs";

const feed = document.querySelector("#posts-feed");
const searchForm = document.querySelector("#search-form");
const postFilter = document.querySelector("#post-filter");

const createPostButton = document.querySelector("#create-post-button");
const createPostTitle = document.querySelector("#create-post-title");
const createPostContent = document.querySelector("#create-post-content");
const titleError = document.querySelector("#title-error");
const contentError = document.querySelector("#content-error");

let allPosts = [];
let filterType = "all";

const token = getToken();

if (!token) {
    location.href = "login.html";
}

getPosts().then(posts => {
    allPosts = posts;
    const filteredPosts = filterPosts(posts);
    filteredPosts.forEach(post => {
        createFeedItem(post);
    });
})

function createFeedItem(post) {

    let postImage = "";
    if (post.media && post.media.length > 3) {
        postImage = `<img src='${post.media}' class='img-fluid rounded' />`;
    }

    feed.innerHTML += `
    <div class="col-12 d-flex flex-column align-items-center mb-5">
        <div class="content d-flex col-md-6 m-1">
            <a href="/post.html?id=${post.id}"><h5>${post.title}</h5></a>
            ${postImage}
            <p>${post.body}</p>
            <div class="content-text form-outline">
                <textarea
                    class="form-control form-control-sm mb-1 mt-2"
                    rows="3"
                    placeholder="Comment"
                ></textarea>
            </div>
            <div class="d-flex flex-direction-row gap-1">
                <button class="btn btn-outline-secondary btn-sm" type="button">
                    Like
                </button>
                <button class="btn btn-outline-secondary btn-sm" type="button">
                    Submit
                </button>
            </div>
        </div>
    </div>
    `;

}

function filterPosts(posts) {

    if (filterType == "image") {
        return posts.filter(post => post.media && post.media.length > 3);
    }
    else if (filterType == "text") {
        return posts.filter(post => !post.media || post.media.length < 3);
    }
    else {
        return posts;
    }

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const [searchQuery] = [...formData.values()];

    if (searchQuery && searchQuery.length > 0) {
        const filteredPosts = allPosts.filter(post => {
            return post.title && post.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 || post.body && post.body.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
        });
        feed.innerHTML = "";
        filteredPosts.forEach(post => {
            createFeedItem(post);
        });
    }
    else {
        feed.innerHTML = "";
        allPosts.forEach(post => {
            createFeedItem(post);
        });
    }
});

postFilter.addEventListener("change", (e) => {
    e.preventDefault();
    filterType = e.target.value;

    const filteredPosts = filterPosts(allPosts);
    feed.innerHTML = "";
    filteredPosts.forEach(post => {
        createFeedItem(post);
    });
});

createPostButton.addEventListener("click", (e) => {
    e.preventDefault();

    titleError.innerText = "";
    contentError.innerText = "";

    const postTitle = createPostTitle.value;
    const postContent = createPostContent.value;
    console.log(postTitle, postContent);

    let error = false;

    if (!postTitle || postTitle.length <= 3) {
        error = true;
        titleError.innerText = "Please provide a title longer than 3 characters";
    }

    if (!postContent || postContent.length <= 10) {
        error = true;
        contentError.innerText = "Please provide a text longer than 10 characters";
    }

    // Don't do anything if we have an error
    if (error) {
        return;
    }

    // Create post if we don't have an error
    createPost(postTitle, postContent).then(post => {
        console.log(post);
        // Adds new post to start of allPosts so we don't have to send another request
        allPosts.unshift(post);

        const filteredPosts = filterPosts(allPosts);
        feed.innerHTML = "";
        filteredPosts.forEach(post => {
            createFeedItem(post);
        });

        createPostTitle.value = "";
        createPostContent.value = "";
    })
})