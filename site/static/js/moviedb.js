// URL for each movie genre
const RATE_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const COMEDIE_URL =
  "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=comedy";
const HORROR_URL =
  "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=horror";
const ACTION_URL =
  "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=action";

// Container for each movie genre
const comedieContainer = document.querySelector(".comedie .movie-container");
const horrorContainer = document.querySelector(".horror .movie-container");
const rateContainer = document.querySelector(".rate .movie-container");
const actionContainer = document.querySelector(".action .movie-container");
const bestMovieContainer = document.querySelector("#best-movie");

/**
 * Return movie info
 * @param {String} movieUrl Url of the movie
 * @return {Object}         Movie info
 */
async function getMovieInfo(movieUrl) {
  let res = await axios.get(movieUrl);
  let data = res.data;
  let movieInfo = {
    title: data.title,
    year: data.year,
    resume: data.description,
    score: data.imdb_score,
    rated: data.rated,
    duration: `${Math.floor(data.duration / 60)}H${data.duration % 60}`,
    real: data.directors,
    genre: data.genres,
    country: data.countries,
    actors: data.actors,
    boxOffice: data.worldwide_gross_income,
    imgUrl: data.image_url,
  };
  return movieInfo;
}

/**
 * Return a list of movie from API
 * @param {String} categorieUrl Url of the categorie
 * @return {Array}              Array of movie
 */
async function getMovieList(categorieUrl) {
  let movieList = [];
  let res = await axios.get(categorieUrl);
  let data = res.data;
  movieList = data["results"];
  let resNext = await axios.get(data["next"]);
  let dataNext = resNext.data;
  movieList = movieList.concat(dataNext["results"]);
  return movieList;
}

/**
 * Create a movie node
 * @param {Object} movieInfo Movie infos
 * @param {HTMLElement} parentNode Parent of the futur movie node
 */
function createMovie(movieInfo, parentNode) {
  let newMovie = document.createElement("article");
  newMovie.classList.add("movie", "hide");
  let img = document.createElement("img");
  img.setAttribute("src", movieInfo.imgUrl);
  newMovie.appendChild(img);
  newMovie.addEventListener("click", () => {
    showModal(movieInfo);
  });
  parentNode.appendChild(newMovie);
}

/**
 * Setup the best movie section
 * @param {Object} movieInfo Movie infos
 */
async function setBestMovie(movieInfo) {
  let title = bestMovieContainer.querySelector("#info h1");
  title.innerText = movieInfo.title;
  let banner = bestMovieContainer.querySelector("#banner");
  banner.setAttribute("src", movieInfo.imgUrl);
  let button = bestMovieContainer.querySelector("#best-movie #info button");
  button.addEventListener("click", () => {
    showModal(movieInfo);
  });
}

/**
 * Set a genre movie section
 * @param {String} genreUrl The genre URL
 * @param {HTMLElement} container The genre movie container
 */
async function setGenreMovie(genreUrl, container) {
  let movie_list = await getMovieList(genreUrl);
  for (let movie of movie_list) {
    let movieInfo = await getMovieInfo(movie.url);
    createMovie(movieInfo, container);
  }
  if (genreUrl === RATE_URL) {
    let movieInfo = await getMovieInfo(movie_list[0].url);
    setBestMovie(movieInfo);
  }
}
