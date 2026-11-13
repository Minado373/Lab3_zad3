const API_KEY = "zaGIaGGPa42GTxL0ELhvYAscO7rPH6ui";
const RANDOM_GIF_URL = "https://api.giphy.com/v1/gifs/random";
const TRENDING_GIFS_URL = "https://api.giphy.com/v1/gifs/trending";

const randomGifButton = document.getElementById("randomGifButton");
const gifElement = document.getElementById("gif");

const searchButton = document.getElementById("searchButton");
const phraseInput = document.getElementById("phraseInput");
const trendingButton = document.getElementById("trendingButton");
const gifsElements = document.querySelectorAll(".gifs_container > img");
const pageNumberElement = document.getElementById("pageNumber");

let page = 1;
const gifsPerPage = 5;

const changeLoaderDisplay = (mode) => {
  loader.style.display = mode === "block" ? "block" : "none";
};

const fetchRandomGif = async () => {
  try {
    changeLoaderDisplay("block");
    const response = await fetch(
      `${RANDOM_GIF_URL}?api_key=${API_KEY}&rating=g`,
    );
    const { data } = await response.json();
    const result = await loadGif(data);
    gifElement.src = result.url;
    gifElement.alt = result.alt;
  } catch (error) {
    console.error(error);
  } finally {
    changeLoaderDisplay("none");
  }
};

const searchGif = async (e) => {
  e.preventDefault();
  const phrase = phraseInput.value;

  try {
    changeLoaderDisplay("block");
    if (phrase) {
      const response = await fetch(
        `${RANDOM_GIF_URL}?api_key=${API_KEY}&rating=g&tag=${phrase}`,
      );
      const { data } = await response.json();

      const result = await loadGif(data);

      gifElement.src = result.url;
      gifElement.alt = result.alt;
    }
  } catch (error) {
    console.error(error);
  } finally {
    changeLoaderDisplay("none");
  }
};

const loadGif = (gif) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ url: img.src, alt: gif.title });
    };

    img.onerror = reject;
    img.src = gif.images.original.url;
  });
};

const fetchTrendingGifs = async () => {
  try {
    const offset = gifsPerPage * (page - 1);
    changeLoaderDisplay("block");

    const response = await fetch(
      `${TRENDING_GIFS_URL}?api_key=${API_KEY}&rating=g&limit=${gifsPerPage}&offset=${offset}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const { data } = await response.json();

    const loadedGifs = await Promise.all(data.map(loadGif));

    gifsElements.forEach((gif) => {
      gif.classList.add("hidden");
    });

    await new Promise((resolve, reject) => setTimeout(() => resolve(), 300));

    loadedGifs.forEach((gif, index) => {
      gifsElements[index].src = gif.url;
      gifsElements[index].alt = gif.alt;
    });
    gifsElements.forEach((gif) => {
      gif.classList.remove("hidden");
    });

    page++;
    pageNumberElement.textContent = page;
  } catch (error) {
    console.error(error);
  } finally {
    changeLoaderDisplay("none");
  }
};

const initApp = () => {
  randomGifButton.addEventListener("click", fetchRandomGif);
  searchButton.addEventListener("click", searchGif);
  trendingButton.addEventListener("click", fetchTrendingGifs);
};

initApp();
