let newsBox = document.getElementById('newsBox');

const xhr = new XMLHttpRequest();

let key = "5ee41684e9124d3382b0e5416bb89437";
let source = "bbc-news";
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${key}`, true);

xhr.getResponseHeader('Content-type', 'application/json');

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);

        let articles = json.articles;
        console.log(articles);
        let newsHTML = "";
        for (key in articles) {

            let currentDate = function getCurrentDate() {
                let dateString = `${articles[key].publishedAt}`;
                dateString = dateString.slice(0, 10);
                let date = new Date(`${dateString.slice(8, 10)} / ${dateString.slice(5, 7)} / ${dateString.slice(0, 4)}`);
                console.log(date);
            }
            let news = `<div class="newsCard card">
                            <img src="${articles[key].urlToImage}"
                                class="img ard-img-top img-thumbnail" alt="Image">
                            <h5 class="card-header">${articles[key].title}</h5>
                            <div class="card-body">
                                <h5 class="card-title">${articles[key].description}</h5>
                                <p class="card-text">${articles[key].content}</p>
                                <a target="_blank" href="${articles[key].url}" class="btn btn-primary">Read more..</a>
                            </div>
                           <div class="card-footer text-muted">${currentDate}</div>
                        </div>`;
            newsHTML += news;
        }
        newsBox.innerHTML = newsHTML;
    }
    else {
        console.log("Some Error Occured");
    }
}

xhr.send();



