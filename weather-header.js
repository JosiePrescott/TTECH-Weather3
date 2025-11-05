const apiKey = "6cf0b0b264e0cda8c71376a5c60287fe";
const lat = 40.7608;
const lon = -111.8910;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const iconMap = {
    Clouds: "overcast.jpg",
    Rain: "Umbrella.jpg",
    Thunderstorm: "thunderStorms.jpg",
    Clear: "Sunny.jpg",
    Snow: "snowy.jpg",
    Smoke: "partlycloudy.jpg"

};

const iconPath = "/img/";

//Current weather
fetch(currentURL)
    .then(res => res.json())
    .then(data => {
        document.getElementById("current-desc").textContent = data.weather[0].description;
        document.getElementById("current-temp").textContent = data.main.temp;
        document.getElementById("current-humid").textContent = data.main.humidity;
        document.getElementById("current-windSpeed").textContent = data.wind.speed;

        const temp = data.main.temp;
        const speed = data.wind.speed;
        const windChill = (temp <= 50 && speed > 3)
            ? Math.round(
                35.74 +
                0.6125 * temp -
                35.75 * Math.pow(speed, 0.16)
            )
            : "N/A";
        document.getElementById("current-windChill").textContent = windChill;
        const weatherCondition = data.weather[0].main;
        const customIcon = iconMap[weatherCondition] || "default.jpg";
        const articleImageURL = `${iconPath}${customIcon}`;
        document.getElementById("articleImage").src = articleImageURL;
    });

//5-Day forecast
fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        const forecastElements = document.querySelectorAll(".flex-col");

        dailyData.slice(0, 5).forEach((day, index) => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short"});

            const weatherCondition = day.weather[0].main;
            const customIcon = iconMap[weatherCondition] || "Sunny.jpg";
            const iconURL = `${iconPath}${customIcon}`;

            forecastElements[index].querySelector(".col-head").textContent = date;
            forecastElements[index].querySelector(".weatherIcon").src = iconURL;
            forecastElements[index].querySelector(".temp-data").innerHTML = `<span>${Math.round(day.main.temp)}°F</span>`;

        });
    });

const footer = document.getElementById("footer");
const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

footer.innerHTML = `
  <p>
    &copy; ${new Date().getFullYear()} | Josie Prescott |
    <a href="https://tooeletech.edu/">Tooele Technical College</a>
    <br />
    Last updated: ${currentDate}
  </p>
`;
