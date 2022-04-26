// gets all users
export const getAllUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getSingleUser = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((response) =>
    response.json()
  );
};

export const getPostsByUserId = (userId) => {
  return fetch(`http://localhost:8088/posts?user_id=${userId}`).then((response) =>
  response.json()
  );
}