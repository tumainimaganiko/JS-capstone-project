import './styles/style.css';
import { fetchComments, postComment } from './modules/CommentApi.js';
import { addLike, getLikes } from './modules/like.js';
import { fetchAllMovies, fetchMovie } from './modules/movieApi';

const renderMovies = (movies, likes) => {
  const moviesContainer = document.querySelector('.movies-container');
  document.querySelector('.movies-count').textContent = movies.length;
  movies.forEach(({ id, name, image }, index) => {
    const movieCard = `
      <div class="container" id=${id}>
      <img src=${image.medium}>
      <span>${name}</span>
      <button class="testing">
        <i class="fa-solid fa-heart"></i>
      </button>
      <span class="likes">${likes[index].likes}</span>
      <button id=${id} class="comment">Comments</button>
      <button class="reservation">Reservations</button></div>`;
    moviesContainer.innerHTML += movieCard;
  });
};

const diplayComments = (comments) => {
  const commentL = document.querySelector('#comment-lists');
  comments.forEach((comment) => {
    const p = document.createElement('p');
    p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    p.classList.add('coment-item');
    p.id = 'count';
    commentL.appendChild(p);
  });
};

const closePopUp = () => {
  const popupContainer = document.querySelector('.popup-container');
  popupContainer.classList.remove('diplayBlock');
  popupContainer.innerHTML = '';
};

const updateComment = () => {
  const pc = document.querySelector('#No-Comment');
  const str = pc.innerHTML;
  const count = str.slice(str.indexOf('(') + 1, str.indexOf(')'));
  pc.innerHTML = `Comments (${Number(count) + 1})`;
};

const addComment = ({ id, username, comment }) => {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const commentL = document.querySelector('#comment-lists');
  const p = document.createElement('p');
  p.innerHTML = `${currentDate} ${username}: ${comment}`;
  p.classList.add('coment-item');
  commentL.appendChild(p);
  updateComment(commentL.parentElement.parentElement.id);
  postComment({ comment, item_id: id, username });
};

const displayPopUp = async (id) => {
  const movieDetail = await fetchMovie(id);
  const comments = await fetchComments(id);
  const popupContainer = document.querySelector('.popup-container');
  const popUpContent = document.createElement('div');
  popUpContent.id = `${id}`;
  popUpContent.innerHTML = `
  <button class="popup-close-btn">X</button>
  <div class="movie-info">
    <div class="movie-image">
      <img src="${movieDetail.image.original}">
    </div>
    <div class="movie-details">
      <h2 class="movie-title">${movieDetail.name}</h2>
      <div class="movie-details-flex">
        <div class="movie-details-left">
          <p class="movie-language">Language: ${movieDetail.language}</p>
          <p class="movie-genres">Genres: ${movieDetail.genres.join(', ')}</p>
        </div>
        <div class="movie-details-right">
          <p class="movie-runtime">Runtime: ${movieDetail.runtime} min</p>
          <p class="movie-rating">Rating: ${movieDetail.rating}</p>
        </div>
      </div>
    </div>
    <p class="movie-summary"> <b>${movieDetail.name}</b> ${
  movieDetail.summary
}</p>
  </div>
  <div class="comment">
    <h2 id="No-Comment">Comments (${comments.length})</h2>
    <div id="comment-lists">
    </div>
    <div class="add-comment">
      <input type="text" placeholder="your name" class="input-name">
      <textarea name="comment" id="user-comment" cols="30" rows="10" placeholder="Your insights"></textarea>
      <button class="btn-comment">Comment</button>
    </div>
  </div>
  `;

  popUpContent.classList.add('popup-content');
  popupContainer.appendChild(popUpContent);
  popupContainer.classList.add('diplayBlock');
  document.querySelector('.popup-close-btn').addEventListener('click', closePopUp);
  document.querySelector('.btn-comment').addEventListener('click', () => {
    const username = document.querySelector('.input-name').value;
    const comment = document.querySelector('#user-comment').value;
    if (username === '' || comment === '') {
      alert('Please fill in your name and comment');
    } else {
      addComment({ id, username, comment });
    }
  });
  diplayComments(comments);
};

window.onload = async () => {
  const movies = (await fetchAllMovies()).splice(0, 9);
  const likes = await getLikes();
  renderMovies(movies, likes);
  const commentBtns = document.querySelectorAll('.comment');
  commentBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const movieID = btn.getAttribute('id');
      displayPopUp(movieID);
    });
  });
};

document.querySelector('main.movies-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-heart')) {
    // stylings of hurt
    event.target.classList.add('color-change');
    event.target.style.color = 'red';
    event.target.style.fontSize = '2rem';
    setTimeout(() => {
      event.target.style.color = 'white';
      event.target.style.fontSize = '1.5rem';
    }, 500);
    const { id } = event.target.parentElement.parentElement;
    addLike(`${id - 1}`);
    const like = event.target.parentElement.nextElementSibling;
    let noLike = event.target.parentElement.nextElementSibling.innerHTML
    noLike = `${Number(noLike) + 1}`;
    like.innerHTML = noLike;
    console.log();
  }
});

document.querySelector('body').addEventListener('click', async (event) => {
  // open popup window to the sepecific item.
  if (event.target.classList.contains('comment')) {
    const { id } = event.target.parentElement;
    displayPopUp(id);
  } else if (event.target.classList.contains('popup-close-btn')) {
    const popupContainer = document.querySelector('.popup-container');
    popupContainer.innerHTML = '';
    popupContainer.classList.remove('diplayBlock');
  } else if (event.target.classList.contains('btn-comment')) {
    event.preventDefault();
    const { id } = event.target.parentElement.parentElement.parentElement;
    const userName = event.target.previousElementSibling.previousElementSibling.value;
    const comment = event.target.previousElementSibling.value;
    const comObj = new Comment(id, userName, comment);
    const date = new Date();
    const current = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    addComment({ creation_date: current, username: userName, cmt: comment });
    postComment(comObj);
    event.target.previousElementSibling.previousElementSibling.value = '';
    event.target.previousElementSibling.value = '';
  }
});
