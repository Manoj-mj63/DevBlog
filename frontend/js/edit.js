// ==============================
// Get Post ID
// ==============================

const params = new URLSearchParams(window.location.search);

const postId = params.get("id");

// ==============================
// Form Elements
// ==============================

const form = document.getElementById("editForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const category = document.getElementById("category");
const image = document.getElementById("image");
const description = document.getElementById("description");

// ==============================
// Load Existing Post
// ==============================

async function loadPost() {

    try {

        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);

        const post = await response.json();

        title.value = post.title;
        author.value = post.author;
        category.value = post.category;
        image.value = post.image;
        description.value = post.description;

    } catch (error) {

        console.error(error);

    }

}

loadPost();

// ==============================
// Update Post
// ==============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedPost = {

        title: title.value,
        author: author.value,
        category: category.value,
        image: image.value,
        description: description.value

    };

    try {

        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(updatedPost)

        });

        const data = await response.json();

       showToast(data.message);

setTimeout(() => {

    window.location.href = "myposts.html";

}, 1500);

    } catch (error) {

        console.error(error);

    }

});