const fetchAllMovies = async () => {
  const submit = await fetch('https://api.tvmaze.com/shows');
  const response = await submit.json();
  return response;
};

const fetchMovie = async (id) => {
  const submit = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const response = await submit.json();
  return response;
};

export { fetchAllMovies, fetchMovie };