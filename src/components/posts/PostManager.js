export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}