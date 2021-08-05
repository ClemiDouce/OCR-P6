let comedieIndex = 0;
let horrorIndex = 0;
let rateIndex = 0;
let actionIndex = 0;
let length = 4;

let leftRate = document.querySelector(".rate .left-arrow");
let rightRate = document.querySelector(".rate .right-arrow");
let leftComedie = document.querySelector(".comedie .left-arrow");
let rightComedie = document.querySelector(".comedie .right-arrow");
let leftHorror = document.querySelector(".horror .left-arrow");
let rightHorror = document.querySelector(".horror .right-arrow");
let leftAction = document.querySelector(".action .left-arrow");
let rightAction = document.querySelector(".action .right-arrow");

let comedieSection = {
  left: leftComedie,
  right: rightComedie,
  index: comedieIndex,
  container: comedieContainer,
};

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

let actionSection = {
  left: leftAction,
  right: rightAction,
  index: actionIndex,
  container: actionContainer,
};

/**
 * Update movie visible for a genre section
 * @param {HTMLElement} section Section to update
 */
function updateContainer(section) {
  listMovie = section.container.querySelectorAll(".movie");
  section["movies"] = listMovie;
  listMovie.forEach((movie) => movie.classList.add("hide"));

  for (let i = 0; i < length; i++) {
    listMovie[section.index + i].classList.remove("hide");
  }
}

/**
 * Move a movie section to the left
 * @param {HTMLElement} section Section to move
 */
function leftMove(section) {
  if (section.index == 0) {
    section.index = section.movies.length - length;
  } else {
    section.index -= 1;
  }
  console.log(section.index);
  updateContainer(section);
}

/**
 * Move a movie section to the right
 * @param {HTMLElement} section Section to move
 */
function rightMove(section) {
  if (section.index == section.movies.length - length) {
    section.index = 0;
  } else {
    section.index += 1;
  }
  updateContainer(section);
}

// Set event for each section left and right buttons
leftRate.addEventListener("click", () => {
  leftMove(rateSection);
});

rightRate.addEventListener("click", () => {
  rightMove(rateSection);
});

leftComedie.addEventListener("click", () => {
  leftMove(comedieSection);
});

rightComedie.addEventListener("click", () => {
  rightMove(comedieSection);
});

leftHorror.addEventListener("click", () => {
  leftMove(horrorSection);
});

rightHorror.addEventListener("click", () => {
  rightMove(horrorSection);
});

leftAction.addEventListener("click", () => {
  leftMove(actionSection);
});

rightAction.addEventListener("click", () => {
  rightMove(actionSection);
});

/**
 * Setup each movie sections
 */
async function setMovies() {
  await Promise.all([
    setGenreMovie(COMEDIE_URL, comedieSection.container),
    setGenreMovie(HORROR_URL, horrorSection.container),
    setGenreMovie(RATE_URL, rateSection.container),
    setGenreMovie(ACTION_URL, actionSection.container),
  ]);
  updateContainer(comedieSection);
  updateContainer(horrorSection);
  updateContainer(rateSection);
  updateContainer(actionSection);
}

setMovies()