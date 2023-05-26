export const countMovies = () => {
  const moviesCount = document.querySelectorAll('.container').length;
  return moviesCount;
};

export const countComments = () => {
  const commentCount = document.querySelectorAll('.coment-item').length;
  return commentCount;
};