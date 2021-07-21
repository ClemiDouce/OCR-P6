let comedieIndex = 0;
let horrorIndex = 0;
let rateIndex = 0;
let length = 3;

let leftRate = document.querySelector(".rate .left-arrow");
let rightRate = document.querySelector(".rate .right-arrow");
let leftComedie = document.querySelector(".comedie .left-arrow");
let rightComedie = document.querySelector(".comedie .right-arrow");
let leftHorror = document.querySelector(".horror .left-arrow");
let rightHorror = document.querySelector(".horror .right-arrow");

let comedieSection = {
  left: leftComedie,
  right: rightComedie,
  index: comedieIndex,
  container: comedieContainer
}

let rateSection = {
  left: leftRate,
  right: rightRate,
  index: rateIndex,
  container: rateContainer,
};

let horrorSection = {
  left: leftHorror,
  right: rightHorror,
  index: horrorIndex,
  container: horrorContainer,
};

function updateContainer(section) {
  listMovie = section.container.querySelectorAll(".movie")
  section['movies'] = listMovie
  listMovie.forEach((movie) => movie.classList.add("hide"));

  for (let i = 0; i < length; i++) {
    listMovie[section.index + i].classList.remove("hide");
  }
  
}

function leftMove(section) {
  if (section.index == 0) {
    section.index = section.movies.length - length;
  } else {
    section.index -= 1;
  }
  console.log(section.index)
  updateContainer(section);
}

function rightMove(section) {
  if (section.index == section.movies.length - length) {
    section.index = 0;
  } else {
    section.index += 1;
  }
  updateContainer(section);
}



leftRate.addEventListener("click", () => {leftMove(rateSection)})

rightRate.addEventListener("click", () => {rightMove(rateSection)})

leftComedie.addEventListener("click", () => { leftMove(comedieSection)})

rightComedie.addEventListener("click", () => { rightMove(comedieSection)});

leftHorror.addEventListener("click", () => {leftMove(horrorSection)});

rightHorror.addEventListener("click", () => { rightMove(horrorSection)});



async function setMovies() {
  await Promise.all([getGenreMovie(COMEDIE_URL, comedieSection.container), getGenreMovie(HORROR_URL, horrorSection.container), getGenreMovie(RATE_URL, rateSection.container)])
  updateContainer(comedieSection)
  updateContainer(horrorSection)
  updateContainer(rateSection)
}

setMovies()