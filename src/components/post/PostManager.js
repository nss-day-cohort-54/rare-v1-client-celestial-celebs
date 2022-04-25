// gets all posts
export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};
// gets all user posts with posts added to user through SQL query
export const getUserPosts = (id) => {
  return fetch(`http://localhost:8088/users?user_id=${id}`).then((res) => res.json());
};
// get a single specific post by id
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
  .then(response => response.json())
}

// sends post body as post to API
export const createPost = (body) => {
  return fetch(`http://localhost:8088/posts`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  })
      .then(response => response.json())
}
// sends put call to API to edit post
export const editPost = (body) => {
  return fetch(`http://localhost:8088/posts/${body.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  })
}
