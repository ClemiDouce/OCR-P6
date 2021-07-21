const modale = document.querySelector('#modale');
const modaleImg = modale.querySelector('#movie-image')
const modaleTitle = modale.querySelector('#movie-title');
const modaleResume = modale.querySelector('#movie-resume');
const modaleDate = modale.querySelector('#movie-date');
const modaleRate = modale.querySelector('#movie-rate');
const modaleScore = modale.querySelector('#movie-score');
const modaleActors = modale.querySelector('#movie-actors');
const modaleReal = modale.querySelector('#movie-real');
const modaleCountry = modale.querySelector('#movie-country');
const modaleDuration = modale.querySelector('#movie-duration');
const modaleBoxOffice = modale.querySelector('#movie-box-office');
let closeButton = modale.querySelector('#close-modale');

function showModal(movieInfo) {
    modaleImg.setAttribute('src', movieInfo.imgUrl)
    modaleTitle.innerText = movieInfo.title;
    modaleResume.innerText = movieInfo.resume;
    modaleDate.innerText = movieInfo.year;
    modaleRate.innerText = movieInfo.rated;
    modaleScore.innerText = movieInfo.score;
    modaleActors.innerText = movieInfo.actors;
    modaleReal.innerText = movieInfo.real;
    modaleCountry.innerText = movieInfo.country;
    modaleDuration.innerText = movieInfo.duration;
    modaleBoxOffice.innerText = movieInfo.boxOffice;
    modale.style.display = "block";
}

function closeModal() {
    modale.style.display = "none";
}

closeButton.onclick = closeModal
