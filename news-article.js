const APIKey = "dc8c7a2875e4420cb56237dad492e3b0";
const URL = `https://newsapi.org/v2/everything?q=tesla&from=2025-10-11&sortBy=publishedAt&language=en&apiKey=${APIKey}`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles.slice(0, 6); // 1 main + 5 archive

    const main = articles[0];
    const rest = articles.slice(1);

    // Update main article
    const mainContainer = document.querySelector(".article");
    mainContainer.innerHTML = `
      <img src="${main.urlToImage || 'https://via.placeholder.com/350'}" class="article-img" />
      <h3><strong>${main.title || "No Article Title"}</strong></h3>
      <p>${main.description || "No Article Description."}</p>
      <a href="${main.url}" target="_blank">Read more</a>
    `;

    // Update archive articles
    const archiveContainer = document.getElementById("archive-articles");
    archiveContainer.innerHTML = ""; // Clear existing placeholders

    rest.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("five-day");
      div.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/200'}" alt="main article" />
        <h3><strong>${article.title || "No Article Title"}</strong></h3>
        <p>${article.description || "No Article Description."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      archiveContainer.appendChild(div);
    });
  })
  .catch(error => console.error("Error fetching articles:", error));
