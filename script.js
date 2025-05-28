// API anahtarınız / Your API key
const apiKey = "YOUR_API_KEY_HERE";

// Hava durumu verisini getiren fonksiyon
// Function to get weather data
function getWeather() {
  // Input'tan şehir al / Get city from input
  let city = document.getElementById("cityInput").value;

  // Eğer input boşsa, seçilen şehirden al / If input is empty, use selected city
  if (!city) {
    city = document.getElementById("citySelect").value;
  }

  // Eğer hala şehir yoksa uyarı ver / If still no city, show alert
  if (!city) {
    alert("Lütfen bir şehir girin veya seçin. / Please enter or select a city.");
    return;
  }

  // API URL'si / API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  // API'den veriyi çek / Fetch data from API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Şehir bulunamadı / City not found");
      }
      return response.json(); // JSON'a çevir / Convert to JSON
    })
    .then(data => {
      // Verileri ayrıştır / Extract data
      const name = data.name;
      const temp = data.main.temp;
      const desc = data.weather[0].description;

      // HTML'e yazdır / Display in HTML
      document.getElementById("weather").innerHTML = `
        <h2>${name}</h2>
        <p>Sıcaklık / Temperature: ${temp} °C</p>
        <p>Durum / Condition: ${desc}</p>
      `;
    })
    .catch(error => {
      // Hata durumunda mesaj yaz / Display error
      document.getElementById("weather").innerHTML = `<p>${error.message}</p>`;
    });
}
