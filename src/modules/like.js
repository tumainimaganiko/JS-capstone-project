const addLike = async (likeId) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/76pKaDmDMWX5au9eSHVx/likes/',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: `${likeId}`,
      }),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};

const getLikes = async () => {
  const like = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/76pKaDmDMWX5au9eSHVx/likes/',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  const result = await like.json();
  return result;
};

export { addLike, getLikes };
