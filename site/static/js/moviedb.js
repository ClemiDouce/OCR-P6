const RATE_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const COMEDIE_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=comedy";
const HORROR_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=horror";

const comedieContainer = document.querySelector(".comedie .movie-container");
const horrorContainer = document.querySelector(".horror .movie-container");
const rateContainer = document.querySelector(".rate .movie-container");
const bestMovieContainer = document.querySelector('#best-movie')


async function getMovieInfo(movieUrl) {
    let res = await axios.get(movieUrl);
    let data = res.data;
    let movieInfo = {
        title: data.title,
        year: data.year,
        resume: data.resume,
        score: data.imdb_score,
        rated: data.rated,
        duration: `${Math.floor(data.duration/60)}H${data.duration%60}`,
        real: data.directors,
        genre: data.genres,
        country: data.countries,
        actors: data.actors,
        boxOffice: data.worldwide_gross_income,
        imgUrl: data.image_url
    }
    return movieInfo
}

async function getMovieList(movieUrl) {
    let movieList = [];
    let res = await axios.get(movieUrl);
    let data = res.data;
    movieList = data['results'];
    let resNext = await axios.get(data['next']);
    let dataNext = resNext.data;
    movieList = movieList.concat(dataNext['results']);
    return movieList

}

function createMovie(movieInfo, parentNode) {
    let newMovie = document.createElement('div');
    newMovie.classList.add('movie', 'hide')
    let img = document.createElement('img');
    img.setAttribute('src', movieInfo.imgUrl)
    newMovie.appendChild(img);
    newMovie.addEventListener('click', () => {
        showModal(movieInfo);
    })
    parentNode.appendChild(newMovie)
}

async function setBestMovie(movieInfo) {
    let title = bestMovieContainer.querySelector('#title')
    title.innerText = movieInfo.title
    let banner = bestMovieContainer.querySelector('#banner')
    banner.setAttribute('src', movieInfo.imgUrl)
    let button = bestMovieContainer.querySelector('#button')
    button.addEventListener('click', () => {
        showModal(movieInfo)
    })
}

async function getGenreMovie(genreUrl, container) {
    let movie_list = await getMovieList(genreUrl);
    for (let movie of movie_list) {
        
        let movieInfo = await getMovieInfo(movie.url);
        createMovie(movieInfo, container);
    }
    if (genreUrl === RATE_URL) {
        let movieInfo = await getMovieInfo(movie_list[0].url);
        setBestMovie(movieInfo)
    } 
}