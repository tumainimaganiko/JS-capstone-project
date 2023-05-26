export const fetchComments = async (id) => {
  const submit = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wHcW9bBNiTZrCNkyx0vn/comments?item_id=${id}`);
  const response = await submit.json();
  return response;
};

export const postComment = async (data) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wHcW9bBNiTZrCNkyx0vn/comments', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};