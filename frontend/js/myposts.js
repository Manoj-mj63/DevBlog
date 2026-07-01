const authorInput = document.getElementById("authorInput");
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("myPostsContainer");

searchBtn.addEventListener("click", loadMyPosts);

async function loadMyPosts() {

    const author = authorInput.value.trim();

    if (!author) {

        showToast("⚠ Please enter an author name.");

        return;

    }

    try {

        const response = await fetch(`http://devblog-n9zh.onrender.com/api/posts/author/${author}`);

        const posts = await response.json();

console.log(posts);
console.log(container);

displayPosts(posts);

    } catch (error) {

        console.error(error);

    }

}

function displayPosts(posts) {

    container.innerHTML = "";

    if (posts.length === 0) {

        container.innerHTML = `
            <h3>No posts found.</h3>
        `;

        return;

    }

    posts.forEach(post => {

        container.innerHTML += `

        <div class="card">

            <img src="${post.image}" alt="${post.title}">

            <div class="card-content">

                <span>${post.category}</span>

                <h3>${post.title}</h3>

                <p>${post.description.substring(0,120)}...</p>

                <div class="card-footer">

                    <small>

                        <i class="fa-solid fa-user"></i>

                        ${post.author}

                    </small>

                    <small>

                        <i class="fa-regular fa-calendar"></i>

                        ${new Date(post.createdAt).toLocaleDateString()}

                    </small>

                </div>
                    <div class="card-actions">

    <a href="post.html?id=${post._id}" class="read-more">

        Read More

    </a>

    <a href="edit.html?id=${post._id}" class="edit-btn">

        Edit

    </a>

    <button
        class="delete-btn"
        onclick="deletePost('${post._id}')">

        Delete

    </button>

</div>

            </div>

        </div>

        `;

    });

}
async function deletePost(id) {

    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`http://devblog-n9zh.onrender.com/api/posts/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

     showToast(data.message);

setTimeout(() => {

    loadMyPosts();

}, 1500);

        loadMyPosts();

    } catch (error) {

        console.error(error);

    }

}