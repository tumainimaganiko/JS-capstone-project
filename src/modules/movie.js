export default class Movie {
  constructor(id, name, img, language, genres, runtime, rating, summary) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.language = language;
    this.genres = genres;
    this.runtime = runtime;
    this.rating = rating;
    this.summary = summary;
  }
}