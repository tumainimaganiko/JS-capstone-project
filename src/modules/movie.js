export default class Movie {
  constructor(id, name, imgM, imgL, language, genres, runtime, rating, summary) {
    this.id = id;
    this.name = name;
    this.imgM = imgM;
    this.imgL = imgL;
    this.language = language;
    this.genres = genres;
    this.runtime = runtime;
    this.rating = rating;
    this.summary = summary;
  }
}