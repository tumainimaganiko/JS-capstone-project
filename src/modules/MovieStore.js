import retrieveItems from './display.js';
import Movie from './movie.js';

export default class MovieStore {
  Movies = [];

  constructor() {
    let i = 1;
    while (i <= 10) {
      this.getMovieFromAPI(i);
      i += 1;
    }
  }

  getMovieFromAPI(id) {
    retrieveItems(id)
      .then((m) => {
        const { name } = m;
        const { language } = m;
        const { genres } = m;
        const { runtime } = m;
        const rating = m.rating.average;
        const { summary } = m;
        const movie = new Movie(id, name, language, genres, runtime, rating, summary);
        this.Movies.push(movie);
      });
  }

  getAll() {
    return this.Movies;
  }
}