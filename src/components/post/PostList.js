import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { deletePost, getPosts } from "./PostManager";
import Post from "./Post";
import { DeleteDialogue } from "./PostModal";
import { useModal } from "./UseModal";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const [currentPost, setCurrentPost] = useState({});

  const { toggleDialogue, modalIsOpen } = useModal("delete-popup");

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, [currentPost]);

  // keyCode is esc key on keyboard, checking if modal is open if popup is open and user presses esc, box closes
  useEffect(() => {
    const handler = (event) => {
      if (event.keyCode === 27 && modalIsOpen) {
        toggleDialogue();
      }
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [toggleDialogue, modalIsOpen]);

  const getAllPosts = () => {
    getPosts().then((postData = setPosts(postData)));
  };

  const onDeleteButtonClick = (postId) => {
    deletePost(postId).then(getAllPosts);
  };

  const confirmDelete = (post) => {
    setCurrentPost(post);
    toggleDialogue();
  };

  return (
    <>
      <DeleteDialogue
        deletePostObject={currentPost}
        toggleDialogue={toggleDialogue}
        setCurrentPost={setCurrentPost}
      />
      <div style={{ margin: "0rem 3rem" }}>
        <h1 className="posts-list">Posts</h1>

        {/* <button onClick={() => history.push("/posts/create")}>Add Post</button> */}

        <article className="posts">
          {posts.map((post) => {
            return (
              <section className="post" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <h3>{post.user_id}</h3>
                <h3>{post.category.label}</h3>
              </section>
            );
          })}
        </article>

        {/*if the user is logged in on /my-posts, they should be able to delete a post
          and a message that displays "are you sure you want to delete this post" should appear  */}
        {posts.map((post) => {
          return (
            <>
              <div className="panel-block">
                <Post
                  key={post.id}
                  post={post}
                  user={post.user_id}
                  confirmDelete={confirmDelete}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
