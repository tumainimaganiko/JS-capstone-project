import './styles/style.css';
import retrieveItems from './modules/retrieveItems.js';
import MovieStore from './modules/MovieStore.js';
import { likeBtn, displayLike } from './modules/like.js';
import { getComment, postComment } from './modules/CommentApi.js';
import Comment from './modules/comments';

// Load movie in to the Store
const store = new MovieStore();

const showLikes = async (element, i) => {
  await likeBtn(i);
  const message = await displayLike();
  element.textContent = message[i].likes;
};

const displayItems = async (i) => {
  const ans = await retrieveItems(i);
  const likeSpan = await displayLike();

  const div = document.createElement('div');
  div.className = 'container';
  div.id = i;
  const img = document.createElement('img');
  img.src = ans.image.medium;
  const span = document.createElement('span');
  span.innerHTML = `${ans.name}`;
  const btn = document.createElement('button');
  btn.classList.add('testing');
  btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
  const like = document.createElement('span');
  like.className = 'likes';
  const comment = document.createElement('button');
  comment.innerHTML = 'Comments';
  comment.href = '#';
  comment.classList.add('comment');
  const reservations = document.createElement('button');
  reservations.innerHTML = 'Reservations';
  reservations.classList.add('reservation');
  reservations.href = '';

  // showLikes(like,i)
  div.appendChild(img);
  div.appendChild(span);
  div.appendChild(btn);
  div.appendChild(like);
  div.appendChild(comment);
  div.appendChild(reservations);

  likeSpan.forEach((index) => {
    if (index.item_id === `${i - 1}`) {
      like.innerHTML = `${index.likes}`;
    }
  });

  const main = document.querySelector('main');
  main.appendChild(div);
};

const addComment = (comment) => {
  const commentL = document.querySelector('#comment-lists');
  const p = document.createElement('p');
  p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.cmt}`;
  p.classList.add('coment-item');
  commentL.appendChild(p);
};

const diplayComments = (id) => {
  const commentL = document.querySelector('#comment-lists');
  getComment(id)
    .then((comments) => {
      if (comments.creation_date !== null) {
        comments.forEach((comment) => {
          const p = document.createElement('p');
          p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
          p.classList.add('coment-item');
          commentL.appendChild(p);
        });
      }
    });
};

const displayPopUp = (id) => {
  const movie = store.getMovie(id);
  const popupContainer = document.querySelector('.popup-container');
  const popUpContent = document.createElement('div');
  popUpContent.id = `${id}`;
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
  <div class="comment">
    <h2>Comments (0)</h2>
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
  diplayComments(id);
};

const end = 6;
const start = 1;

const displayItemsRecursive = (start) => new Promise((resolve) => {
  displayItems(start).then(() => {
    if (start < end) {
      resolve(displayItemsRecursive(start + 1));
    } else {
      resolve();
    }
  });
});

await displayItemsRecursive(start);

const btn = document.querySelectorAll('.testing');
btn.forEach((element, index) => {
  element.addEventListener('click', async (e) => {
    const span = e.currentTarget.parentNode.children[3];
    await showLikes(span, index);
  });
});

const heartLike = document.querySelectorAll('.fa-heart');
heartLike.forEach((element) => {
  element.addEventListener('click', () => {
    element.style.color = 'red';
  });
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
