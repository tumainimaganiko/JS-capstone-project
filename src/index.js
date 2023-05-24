import './styles/style.css';
import retrieveItems from './modules/display.js';
import MovieStore from './modules/MovieStore';

// Load movie in to the Store
const store = new MovieStore();

const displayItems = async (i) => {
  const ans = await retrieveItems(i);

  const div = document.createElement('div');
  div.className = 'container';
  div.id = i;
  const img = document.createElement('img');
  img.src = ans.image.medium;
  const span = document.createElement('span');
  span.innerHTML = `${ans.name}`;
  const comment = document.createElement('button');
  comment.innerHTML = 'Comments';
  comment.href = '#';
  comment.classList.add('comment');
  const reservations = document.createElement('button');
  reservations.innerHTML = 'Reservations';
  reservations.classList.add('reservation');
  reservations.href = '';

  div.appendChild(img);
  div.appendChild(span);
  div.appendChild(comment);
  div.appendChild(reservations);

  const main = document.querySelector('main');
  main.appendChild(div);
};

const displayPopUp = (id) => {
  const movie = store.getMovie(id);
  const popupContainer = document.querySelector('.popup-container');
  const popUpContent = document.createElement('div');
  popUpContent.innerHTML = `
  <button class="popup-close-btn">X</button>
  <div class="movie-info">
    <div class="movie-image">
      <img src="${movie.imgM}">
    </div>
    <div class="movie-details">
      <h2 class="movie-title">${movie.name}</h2>
      <div class="movie-details-flex">
        <div class="movie-details-left">
          <p class="movie-language">Language: ${movie.language}</p>
          <p class="movie-genres">Genres: ${movie.genres.join(', ')}</p>
        </div>
        <div class="movie-details-right">
          <p class="movie-runtime">Runtime: ${movie.runtime} min</p>
          <p class="movie-rating">Rating: ${movie.rating}</p>
        </div>
      </div>
    </div>
    <p class="movie-summary"> <b>${movie.name}</b> ${movie.summary}</p>
  </div>
  `;

  popUpContent.classList.add('popup-content');
  popupContainer.appendChild(popUpContent);
  popupContainer.classList.add('diplayBlock');
  console.log(popUpContent);
};

const end = 7;
let start = 1;
while (start < end) {
  displayItems(start);
  start += 1;
}

document.querySelector('body').addEventListener('click', (event) => {
  // open popup window to the sepecific item.
  if (event.target.classList.contains('comment')) {
    const { id } = event.target.parentElement;
    displayPopUp(id);
  } else if (event.target.classList.contains('popup-close-btn')) {
    const popupContainer = document.querySelector('.popup-container');
    popupContainer.innerHTML = '';
    popupContainer.classList.remove('diplayBlock');
  }
});
