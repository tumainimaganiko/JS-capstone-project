import retrieveItems from './display.js';
import Movie from './movie.js';

export default class MovieStore {
  Movies = [];

  comment = [
    [
      {
        comment: 'This is nice!',
        creation_date: '2021-01-10',
        username: 'Paul',
      },
      {
        comment: 'Great content!',
        creation_date: '2021-02-10',
        username: 'Mia',
      },
    ],
    [
      {
        comment: 'This is nice!',
        creation_date: '2021-01-10',
        username: 'John',
      },
      {
        comment: 'Great content!',
        creation_date: '2021-02-10',
        username: 'Jane',
      },
    ],
  ]

  constructor() {
    let i = 1;
    while (i <= 10) {
      this.getMovieFromAPI(i);
      i += 1;
    }
  }

  getMovieFromAPI(id) {
    let movie;

    retrieveItems(id)
      .then((m) => {
        const { name } = m;
        const imgM = m.image.medium;
        const imgL = m.image.original;
        const { language } = m;
        const { genres } = m;
        const { runtime } = m;
        const rating = m.rating.average;
        let { summary } = m;
        summary = summary.slice(summary.indexOf('</b>') + 4, summary.indexOf('</p>'));
        movie = new Movie(id, name, imgM, imgL, language, genres, runtime, rating, summary);
        this.Movies.push(movie);
      });
  }

  getAll() {
    return this.Movies;
  }

  getMovie(id) {
    return this.Movies[id - 1];
  }

  getMovieComment(id) {
    return this.comment[id - 1];
  }
}