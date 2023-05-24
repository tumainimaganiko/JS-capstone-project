import './styles/style.css';
import retrieveItems from './modules/display.js';
import MovieStore from './modules/MovieStore';

const store = new MovieStore();
console.log(store.getAll());

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
  alert(movie.name);
  const popUpContent = document.createElement('div');
  popUpContent.innerHTML = `
  <button class="close-btn">X</button>
  <div class="movie-info">
    <div class="movie-image">
      <img src="https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg">
    </div>
    <div class="movie-details">
      <h2 class="movie-title">Movie Title</h2>
      <div class="movie-details-flex">
        <div class="movie-details-left">
          <p class="movie-language">Language: English</p>
          <p class="movie-genres">Genres: Action, Adventure</p>
        </div>
        <div class="movie-details-right">
          <p class="movie-runtime">Runtime: 120 min</p>
          <p class="movie-rating">Rating: 8.5</p>
        </div>
      </div>
    </div>
    <p class="movie-summary">Lorem ipsum for sit amet, consectetur adipiscing elit. Nulla ut nisi at turpis viverra accumsan. Fusce euismod, quam eu vulputate porta, nibh dolor mattis quam, vel ornare lorem elit vel risus. Sed fringilla nisi ipsum, vel tristique nisl euismod nec.</p>
  </div>
  `;
};

const end = 7;
let start = 1;
while (start < end) {
  displayItems(start);
  start += 1;
}

document.querySelector('main').addEventListener('click', (event) => {
  if (event.target.classList.contains('comment')) {
    const { id } = event.target.parentElement;
    displayPopUp(id);
  }
});