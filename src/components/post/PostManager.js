export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};
export const getUserPosts = (id) => {
  return fetch(`http://localhost:8088/users?user_id=${id}`).then((res) => res.json());
};

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
  .then(response => response.json())
}


