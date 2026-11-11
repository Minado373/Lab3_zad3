const API_KEY = "zaGIaGGPa42GTxL0ELhvYAscO7rPH6ui";
const RANDOM_GIF_URL = "https://api.giphy.com/v1/gifs/random";

const randomGifButton = document.getElementById("randomGifButton");
const gifElement = document.getElementById("gif");

const fetchRandomGif = async () => {
  const response = await fetch(`${RANDOM_GIF_URL}?api_key=${API_KEY}&rating=g`);
  const { data } = await response.json();
  gifElement.src = data.images.original.url;
  gifElement.alt = data.title;
};

const initApp = () => {
  randomGifButton.addEventListener("click", fetchRandomGif);
};

initApp();
