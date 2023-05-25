import retrieveItems from './display.js';
import Movie from './movie.js';

export default class MovieStore {
  Movies = [];

  comment = [];

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
}