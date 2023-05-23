import './styles/style.css';
import retrieveItems from './modules/display.js';
import MovieStore from './modules/MovieStore';

const displayItems = async (i) => {
  const ans = await retrieveItems(i);

  const div = document.createElement('div');
  div.className = 'container';
  div.id = i;
  const img = document.createElement('img');
  img.src = ans.image.medium;
  const span = document.createElement('span');
  span.innerHTML = `${ans.name}`;
  const comment = document.createElement('a');
  comment.innerHTML = 'Comments';
  comment.href = '';
  const reservations = document.createElement('a');
  reservations.innerHTML = 'Reservations';
  reservations.href = '';

  div.appendChild(img);
  div.appendChild(span);
  div.appendChild(comment);
  div.appendChild(reservations);

  const main = document.querySelector('main');
  main.appendChild(div);
};

const end = 7;
let start = 1;
while (start < end) {
  displayItems(start);
  start += 1;
}

const store = new MovieStore();
console.log(store.getAll());