const container = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const loader = document.getElementById("loader");

let allPosts = [];

// ==============================
// Display Posts
// ==============================

function displayPosts(posts) {

    container.innerHTML = "";

    // Empty State
    if (posts.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>📰 No Posts Found</h2>

                <p>Try another search or create a new blog.</p>

            </div>

        `;

        return;

    }

    posts.forEach(post => {

        container.innerHTML += `

        <div class="card">

            <img
                src="${post.image}"
                alt="${post.title}"
                onerror="this.src='https://placehold.co/800x450/1e293b/ffffff?text=DevBlog';">

            <div class="card-content">

                <span>${post.category}</span>

                <h3>${post.title}</h3>

                <p>

                    ${post.description.substring(0,120)}...

                </p>

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

                <a href="post.html?id=${post._id}" class="read-more">

                    Read More →

                </a>

            </div>

        </div>

        `;

    });

}

// ==============================
// Filter Posts
// ==============================

function filterPosts() {

    const keyword = searchInput.value.toLowerCase();

    const category = categoryFilter.value;

    const filteredPosts = allPosts.filter(post => {

        const matchesSearch =

            post.title.toLowerCase().includes(keyword) ||

            post.description.toLowerCase().includes(keyword) ||

            post.author.toLowerCase().includes(keyword);

        const matchesCategory =

            category === "All" ||

            post.category === category;

        return matchesSearch && matchesCategory;

    });

    displayPosts(filteredPosts);

}

// ==============================
// Load Posts
// ==============================

async function loadPosts() {

    try {

        const response = await fetch("http://localhost:5000/api/posts");

        allPosts = await response.json();

        displayPosts(allPosts);

    } catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="empty-state">

                <h2>❌ Failed to Load Posts</h2>

                <p>Please check if your backend server is running.</p>

            </div>

        `;

    } finally {

        // Hide Loader
        if (loader) {

            loader.style.display = "none";

        }

    }

}

loadPosts();

// ==============================
// Events
// ==============================

searchInput.addEventListener("input", filterPosts);

categoryFilter.addEventListener("change", filterPosts);