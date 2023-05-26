import { countComments, countMovies } from './Counters.js';

document.body.innerHTML = `
  <div class = 'container'>
    movie info
  </div>
  <div class = 'container'>
    movie info
  </div>
  <div class = 'container'>
    movie info
  </div>
  <div class = 'container'>
    movie info
  </div>
  <p class="coment-item" id="count">2023-05-25 Paul: This is Paul Comment</p>
  <p class="coment-item" id="count">2023-05-25 Paul: This is Paul Comment</p>
  <p class="coment-item" id="count">2023-05-25 Jasmin: I love these movie</p>
  <p class="coment-item" id="count">2023-05-25 test: testing</p>
  <p class="coment-item" id="count">2023-05-26 Tumaini: Good movie</p>
  <p class="coment-item" id="count">2023-05-26 Tumaini: Good movie</p>
  <p class="coment-item" id="count">2023-05-26 abel: komachua</p>
  <p class="coment-item" id="count">2023-05-26 Mia: update</p>
  `;

describe('Counter Test', () => {
  test('When movie cards are renderd to the dom the count function should return the exact number of the div elements', () => {
    const count = countMovies();
    expect(count).toBe(4);
  });

  test('When movie cards are renderd to the dom the count function should return the exact number of the div elements', () => {
    const count = countComments();
    expect(count).toBe(8);
  });
});