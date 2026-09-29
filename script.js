// =========================
// SEARCH AND FILTER
// =========================

const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const yearFilter = document.getElementById("yearFilter");
const novels = document.querySelectorAll(".novel-card");

function filterNovels() {

    if (!searchInput || !genreFilter || !yearFilter) return;

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value;

    novels.forEach(function(novel) {

        const title = novel.querySelector("h3").textContent.toLowerCase();
        const description = novel.querySelector(".description").textContent.toLowerCase();

        const genre = novel.dataset.genre;
        const year = novel.dataset.year;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesGenre =
            selectedGenre === "all" ||
            genre === selectedGenre;

        const matchesYear =
            selectedYear === "all" ||
            year === selectedYear;

        novel.style.display =
            matchesSearch && matchesGenre && matchesYear
                ? "flex"
                : "none";
    });
}


// Search
if (searchInput) {
    searchInput.addEventListener("input", filterNovels);
}

// Genre filter
if (genreFilter) {
    genreFilter.addEventListener("change", filterNovels);
}

// Year filter
if (yearFilter) {
    yearFilter.addEventListener("change", filterNovels);
}


// =========================
// GENRE BUTTONS
// =========================

const genreButtons = document.querySelectorAll(".genre-box");

genreButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const genre = button.dataset.genre;

        if (genre && genreFilter) {

            genreFilter.value = genre;

            filterNovels();

            document.getElementById("library").scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =========================
// NOVEL PAGE BUTTONS
// =========================

let likes = 0;


// LIKE
function likeNovel() {

    likes++;

    const likeCount = document.getElementById("likeCount");

    if (likeCount) {
        likeCount.textContent = likes;
    }
}


// SHARE
function shareNovel() {

    if (navigator.share) {

        navigator.share({
            title: document.title,
            text: "Read this novel on Sonia's Novel Library!",
            url: window.location.href
        });

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("📋 Novel link copied! You can now share it.");
    }
}


// SUBSCRIBE
function subscribeNovel() {

    alert(
        "🔔 You are now subscribed!\n\n" +
        "You will be notified when a new chapter is added."
    );
}


// COMMENT
function addComment() {

    const commentBox =
        document.getElementById("commentBox");

    const commentsList =
        document.getElementById("commentsList");

    if (!commentBox || !commentsList) return;

    const comment =
        commentBox.value.trim();

    if (comment === "") {

        alert("Please write a comment first.");

        return;
    }

    const newComment =
        document.createElement("p");

    newComment.textContent =
        "💬 " + comment;

    commentsList.appendChild(newComment);

    commentBox.value = "";
}