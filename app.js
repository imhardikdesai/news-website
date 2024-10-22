const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
document.getElementById(
  "footerText"
).innerHTML = `Copyright &copy;${new Date().getFullYear()} &nbsp; Hardik Desai`;
// Function to toggle dark mode based on user preference
function toggleDarkMode() {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

// Event listener for dark mode toggle button
darkModeToggle.addEventListener("change", toggleDarkMode);

// Function to check and set initial dark mode state based on user preferences
function setInitialDarkMode() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (prefersDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }
}

// Call the function to set initial dark mode state
//setInitialDarkMode();

let newsBox = document.getElementById("newsBox");
let spinner = document.getElementById("spinner");
let newsCategory = [
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

// Create XMLHttpRequest Object
const xhr = new XMLHttpRequest();

function sendCategory(index) {
  getNews(newsCategory[index]);
}
getNews("all");

function getNews(newsCategoryName) {
  xhr.open("GET", `https://saurav.tech/NewsAPI/everything/cnn.json`, true);

  xhr.getResponseHeader("Content-type", "application/json");

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.articles;

      let newsHTML = "";

      for (key in data) {
        let news = `<div class="newsCard">
        <div class="imageWrapper">
        <img src="${data[key].urlToImage}"
        class="thumnail" alt="Image">
            </div>
            <div class="card-body">
            <div class="card-date">${new Date(
              data[key].publishedAt
            ).toDateString()}</div>
                      <h5 class="card-title">${data[key].title}</h5>
                                <h5 class="card-author">Author: ${
                                  data[key].author
                                }</h5>
                                <p class="card-text">${data[key].content}</p>
                                <a target="_blank" href="${
                                  data[key].url
                                }" class="btn btn-primary">Read more..</a>
                            </div>
                           
                        </div>`;
        newsHTML += news;
      }

      spinner.style.visibility = "hidden";
      newsBox.style.visibility = "visible";

      newsBox.innerHTML = newsHTML;
    } else {
      console.log("Some Error Occurred");
    }
  };

  xhr.send();
}
