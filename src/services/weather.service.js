const SITE_URL = "https://api.openweathermap.org/data/3.0/onecall?";

export function getWeather(lat, lon) {
  return fetch(
    `${SITE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  ).then((res) => res.json());
}
