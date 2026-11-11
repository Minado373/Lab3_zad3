const API_KEY = "zaGIaGGPa42GTxL0ELhvYAscO7rPH6ui";
const RANDOM_GIF_URL = "https://api.giphy.com/v1/gifs/random";

const randomGifButton = document.getElementById("randomGifButton");
const gifElement = document.getElementById("gif");

const searchButton = document.getElementById("searchButton");
const phraseInput = document.getElementById("phraseInput");

const fetchRandomGif = async () => {
  try {
    const response = await fetch(
      `${RANDOM_GIF_URL}?api_key=${API_KEY}&rating=g`,
    );
    const { data } = await response.json();
    gifElement.src = data.images.original.url;
    gifElement.alt = data.title;
  } catch (error) {
    console.error(error);
  }
};

const searchGif = async (e) => {
  e.preventDefault();
  const phrase = phraseInput.value;

  try {
    if (phrase) {
      const response = await fetch(
        `${RANDOM_GIF_URL}?api_key=${API_KEY}&rating=g&tag=${phrase}`,
      );
      const { data } = await response.json();
      gifElement.src = data.images.original.url;
      gifElement.alt = data.title;
    }
  } catch (error) {
    console.error(error);
  }
};

const initApp = () => {
  randomGifButton.addEventListener("click", fetchRandomGif);
  searchButton.addEventListener("click", searchGif);
};

initApp();
