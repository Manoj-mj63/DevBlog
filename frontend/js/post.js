// =======================================
// Get Post ID From URL
// =======================================

const params = new URLSearchParams(window.location.search);

const postId = params.get("id");

const postContainer = document.getElementById("postContainer");

// =======================================
// Load Single Post
// =======================================

async function loadPost() {

    try {

        const response = await fetch(`http://devblog-n9zh.onrender.com/api/posts/${postId}`);

        const post = await response.json();

        postContainer.innerHTML = `

            <div class="post-details">

                <img src="${post.image}" alt="${post.title}" class="post-image">

                <span class="post-category">${post.category}</span>

                <h1>${post.title}</h1>

                <div class="post-meta">

                    <span>
                        <i class="fa-solid fa-user"></i>
                        ${post.author}
                    </span>

                    <span>
                        <i class="fa-regular fa-calendar"></i>
                        ${new Date(post.createdAt).toLocaleDateString()}
                    </span>

                </div>

                <p class="post-description">

                    ${post.description}

                </p>

                <a href="index.html" class="back-btn">

                    ← Back to Home

                </a>

            </div>

        `;

    } catch (error) {

        console.error("Error loading post:", error);

    }

}

loadPost();