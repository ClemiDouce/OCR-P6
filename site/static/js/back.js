let testComedieContainer = document.querySelector('div.comedie.container .movie-container')
let comedieIndex = 2

async function setMovie(container, index) {
    let movieList = container.querySelectorAll('.movie')
    console.log(movieList)
    for (let i = 0; i < 3; i++) {
      let currentMovie = movieList[index + i];
      currentMovie.classList.remove("hide");
    }
}

async function start() {
    await getGenreMovie(COMEDIE_URL, testComedieContainer)
    await setMovie(testComedieContainer, comedieIndex)
}

start()