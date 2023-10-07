let newsBox = document.getElementById("newsBox");
let spinner = document.getElementById("spinner");
let newsCateogry = [
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
// Create XML Object
const xhr = new XMLHttpRequest();

function sendCategory(index) {
  getNews(newsCateogry[index]);
}
getNews("all");

function getNews(newsCateogryName) {
  xhr.open(
    "GET",
    `https://inshortsapi.vercel.app/news?category=${newsCateogryName}`,
    true
  );

  xhr.getResponseHeader("Content-type", "application/json");

  xhr.onload = function () {
    // status code 200 is For "OK"
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.data; // Get data Oblect
      // console.log(data);
      let newsHTML = "";

      function showSpinner() {
        spinner.style.visibility = "hidden";
        newsBox.style.visibility = "visible";
      }

      xhr.onprogress = showSpinner();

      //Applying Loop on data to get inner elements
      for (key in data) {
        let news = `<div class="newsCard">
        <div class="imageWrapper">
        <img src="${data[key].imageUrl}"
        class="thumnail" alt="Image">
            </div>
            <div class="card-body">
            <div class=" card-date ">${data[key].date}</div>
                      <h5 class="card-title">${data[key].title}</h5>
                                <h5 class="card-author">Author: ${data[key].author}</h5>
                                <p class="card-text">${data[key].content}</p>
                                <a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">Read more..</a>
                            </div>
                           
                        </div>`;
        newsHTML += news;
      }
      // Manuplating DOM
      newsBox.innerHTML = newsHTML;
    } else {
      console.log("Some Error Occured");
    }
  };

  xhr.send(); // This is important to run whole code
}
