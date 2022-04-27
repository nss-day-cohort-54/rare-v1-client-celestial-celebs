export const getPostComments = (id) => {
    return fetch(`http://localhost:8088/comments?post_id=${id}`).then((res) => res.json());
  };