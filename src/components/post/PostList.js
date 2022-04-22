import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { deletePost, getPosts, deletePost } from "./PostManager";
import Post from "./Post";
import { DeleteDialogue } from "./PostModal";

export const PostList = ({ onDeleteButtonClick }) => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { toggleDialogue, modalIsOpen } = useModal("#delete-popup");

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, []);

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

  const useModal = (selector) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const toggleDialogue = () => {
      setModalOpen(!modalIsOpen);
      if (modalIsOpen) {
        document.querySelector(`${selector}`).removeAttribute("open");
      } else {
        document.querySelector(`${selector}`).removeAttribute("open", true);
      }
    };
    return { toggleDialogue, modalIsOpen };
  };

  return (
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
            <DeleteDialogue
              deletePostObject={post}
              toggleDialogue={toggleDialogue}
            />
            <div className="panel-block">
              <Post
                key={post.id}
                post={post}
                user={users.find((u) => u.id === post.user_id)}
                onDeleteButtonClick={toggleDialogue()}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};
