export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((response) =>
    response.json()
  );
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};
