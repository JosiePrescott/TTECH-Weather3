const APIKey = `pub_c1ff8ce15c5a480a8212b9230d7e9d3e`
const URL = `https://newsdata.io/api/1/latest? 
  apikey=${APIKey}&country=us&language=en`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const articles = data.results.slice(0, 6);  

    const main = articles[0];
    const rest = articles.slice(1);

  
    const mainContainer = document.querySelector(".article");
    mainContainer.innerHTML = `
      <img src="${main.image_url || 'https://via.placeholder.com/350'}" class="article-img" />
      <h3><strong>${main.title || "No Article Title"}</strong></h3>
      <p>${main.description || "No Article Description."}</p>
      <a href="${main.url}" target="_blank">Read more</a>
    `;

    const archiveContainer = document.getElementById("archive-articles");
    archiveContainer.innerHTML = ""; 

    rest.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("five-day");
      div.innerHTML = `
        <img src="${article.image_url || 'https://via.placeholder.com/200'}" alt="main article" />
        <h3><strong>${article.title || "No Article Title"}</strong></h3>
        <p>${article.description || "No Article Description."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      archiveContainer.appendChild(div);
    });
  })
  .catch(error => console.error("Error fetching articles:", error));



