const likeBtn = async (likeId) => {
    const like = await fetch (`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lrcVZB2tmQHgSmgF6kle/likes/`, {
        method: 'POST',
        body: JSON.stringify({
            item_id: `${likeId}`
        }),
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    })
}
const displayLike = async () => {
    const like = await fetch (`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lrcVZB2tmQHgSmgF6kle/likes/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    });

    const result = await like.json();
    return result;
}

export {likeBtn, displayLike};