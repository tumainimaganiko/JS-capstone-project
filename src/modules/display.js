const retrieveItems = async (id) => {
  const submit = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const response = await submit.json();
  return response;
};

export default retrieveItems;
