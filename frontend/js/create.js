const form = document.getElementById("postForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const publishBtn = document.querySelector(".publish-btn");

    publishBtn.innerHTML = "Publishing...";
    publishBtn.disabled = true;

    const post = {

        title: document.getElementById("title").value.trim(),

        author: document.getElementById("author").value.trim(),

        category: document.getElementById("category").value,

        image: document.getElementById("image").value.trim(),

        description: document.getElementById("description").value.trim()

    };

    try {

        const response = await fetch("http://devblog-n9zh.onrender.com/api/posts", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(post)

        });

        const data = await response.json();

        if(response.ok){

    showToast("✅ Blog Published Successfully!");

    form.reset();

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1500);

}
        else{

          showToast(data.message);

setTimeout(() => {

    window.location.href = "index.html";

}, 1500);

        }

    }catch(error){

        console.error(error);

        showToast("❌ Server Error!");

    }

    publishBtn.innerHTML = `
        <i class="fa-solid fa-paper-plane"></i>
        Publish Post
    `;

    publishBtn.disabled = false;

});